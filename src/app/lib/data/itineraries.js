"use server";
import { sql } from "@vercel/postgres";
import { auth } from "../../../../auth";
import { uploadImage } from "./images";
import { del } from "@vercel/blob";
import { postDays } from "./days";
import { FaCommentDollar } from "react-icons/fa";

export async function postItinerary(formData, daysArray) {
  const session = await auth();
  const user_id = session.user.user_id;
  const title = formData.get("title");
  const itinerary_description = formData.get("itineraryDescription");
  const budget = formData.get("budget");
  const itinerary_image = formData.get("itineraryImage");
  let itinerary_image_url;

  try {
    if (itinerary_image.size > 0) {
      itinerary_image_url = await uploadImage(itinerary_image);
    }

    const itineraries_res = await sql`
      INSERT INTO itineraries 
      (title, itinerary_image_url, itinerary_description, user_id, budget)
      VALUES (${title}, ${itinerary_image_url}, ${itinerary_description}, ${user_id}, ${budget})
      RETURNING *`;
    const itineraryInfo = itineraries_res.rows[0];
    const itineraryDays = await postDays(daysArray, itineraryInfo.itinerary_id);

    const returnObject = {
      itineraryInfo,
      itineraryDays,
    };

    return returnObject;
  } catch (error) {
    console.error("Error posting to itineraries:", error);
    throw new Error("Error posting to itineraries");
  }
}

export async function getItineraryById(id) {
  try {
    const checkUser = await sql`
    SELECT user_id 
    FROM itineraries
    WHERE itinerary_id=${id}`
    const userExists=checkUser.rows[0].user_id

    let sqlStr=`
      SELECT i.itinerary_id, i.title, i.itinerary_image_url, i.user_id, i.itinerary_description, i.created_at, i.budget, u.username, u.avatar_img_url, COALESCE(CAST(SUM(vote_value)AS INTEGER),0) AS total_votes
      FROM itineraries i
      FULL JOIN itinerary_votes v
      ON i.itinerary_id=v.itinerary_id
      LEFT JOIN users u
      ON i.user_id=u.user_id
      WHERE i.itinerary_id= ${id}
      GROUP BY i.itinerary_id, u.username, u.avatar_img_url`
 

    const itineraryRes = await sql.query(sqlStr);

    const daysRes = await sql`
    SELECT * FROM days
    WHERE days.itinerary_id= ${id}`;

   
    const commentsRes = await sql`
    SELECT comments.comment_id, comments.user_id, comments.itinerary_id, comments.comment_body, u.username, u.avatar_img_url, comments.created_at FROM comments 
    INNER JOIN users u
    ON comments.user_id=u.user_id
    WHERE comments.itinerary_id= ${id}
    ORDER BY comments.created_at DESC;`;

    const itineraryDays = daysRes.rows.sort(
      (a, b) => a.day_number - b.day_number
    );

    const itineraryObject = {
      itineraryInfo: itineraryRes.rows[0],
      itineraryDays: itineraryDays,
      itineraryComments: commentsRes.rows,
    };
    
    return itineraryObject;
  } catch (error) {
    console.error("Data fetching error:", error);
    throw new Error("500: Server error");
  }
}

export async function getItineraries(limit) {
  try {
    let sqlString = `
    SELECT i.itinerary_id, i.title, i.itinerary_image_url, i.user_id, i.itinerary_description, i.created_at, i.budget, COALESCE(CAST(COUNT(d.day_number)AS INTEGER),0) AS number_of_days, u.username, uv.total_votes, loc.country_list, loc.region_list, loc.place_list

    FROM itineraries i
    LEFT JOIN days d
    ON i.itinerary_id=d.itinerary_id
    LEFT JOIN users u
    ON i.user_id=u.user_id

    LEFT JOIN (
      SELECT i.itinerary_id, COALESCE(CAST(SUM(vote_value)AS INTEGER),0) AS total_votes
      FROM itineraries i
      FULL JOIN itinerary_votes v
      ON i.itinerary_id=v.itinerary_id
      GROUP BY i.itinerary_id
    ) uv

    ON i.itinerary_id=uv.itinerary_id

    LEFT JOIN(
      SELECT i.itinerary_id, ARRAY_AGG(DISTINCT(country)) AS country_list, ARRAY_AGG(DISTINCT(region)) AS region_list, ARRAY_AGG(DISTINCT(place)) AS place_list
      FROM itineraries i
      JOIN days d
      ON i.itinerary_id = d.itinerary_id
      GROUP BY i.itinerary_id
    ) loc
    ON i.itinerary_id=loc.itinerary_id
    GROUP BY i.itinerary_id, u.username, uv.total_votes, loc.country_list, loc.region_list, loc.place_list
    ORDER BY total_votes DESC
    `;

    if (limit) {
      sqlString += `LIMIT ${limit}`;
     
    }
    const allItinerariesSQL = await sql.query(sqlString);
    return allItinerariesSQL.rows;
  } catch (error) {
    console.error("Data fetching error:", error);
    throw new Error("500: Server error");
  }
}

export async function patchItinerary(
  formData,
  daysArray,
  itineraryId,
  itineraryImageUrl
) {
  const title = formData.get("title");
  const itinerary_description = formData.get("itineraryDescription");
  const budget = formData.get("budget");
  const itinerary_image = formData.get("itineraryImage");
  const session = await auth();
  const currentUserId = session?.user?.user_id;

  try {
    if (itinerary_image.size > 0) {
      itineraryImageUrl && del(itineraryImageUrl);
      itineraryImageUrl = await uploadImage(itinerary_image);
    }
    const patchItinerary = await sql`
    UPDATE itineraries
    SET title = ${title}, itinerary_description = ${itinerary_description}, budget = ${budget}, itinerary_image_url=${itineraryImageUrl}
    WHERE itinerary_id = ${itineraryId}
    AND user_id = ${currentUserId}
    RETURNING *`;

    if (patchItinerary.rows.length === 0) {
      throw new Error();
    }

    const deleteDays = await sql`
    DELETE from days
    WHERE itinerary_id=${itineraryId}
    RETURNING *
    `;

    const returnedDays = await postDays(daysArray, itineraryId);
  } catch (error) {
    return error;
  }
}

export async function deleteItinerary(itinerary_id) {
  const session = await auth();
  const currentUserId = session?.user?.user_id;

  try {
    const deletedItinerary = await sql`
        DELETE FROM itineraries
        WHERE itinerary_id = ${itinerary_id}
        AND user_id = ${currentUserId}
        RETURNING *`;
    if (deletedItinerary.rows.length === 0) {
      throw new Error();
    }
    return deletedItinerary.rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
}
