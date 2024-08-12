"use server";
import { sql } from "@vercel/postgres";
import { auth } from "../../../../auth";
import { uploadImage } from "./images";

export async function getPopularItineraries() {
  try {
    const res = await sql`
        SELECT i.itinerary_id, i.title, i.itinerary_image_url, i.user_id, i.itinerary_description, i.created_at, i.budget, COALESCE(CAST(SUM(vote_value)AS INTEGER),0) AS total_votes
        FROM itineraries i
        FULL JOIN itinerary_votes v
        ON i.itinerary_id=v.itinerary_id
        GROUP BY i.itinerary_id
        ORDER BY total_votes DESC
        LIMIT 3`;
    return res.rows;
  } catch (error) {
    console.error("Data fetching error:", error);
    throw new Error("500: Server error");
  }
}

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

    const itineraryDays = await Promise.all(
      daysArray.map(async (day, index) => {
        const res = await sql`
            INSERT INTO days (itinerary_id, day_number, day_plan, accomodation, transport, country, region, place)
            VALUES (${itineraryInfo.itinerary_id}, ${index + 1}, ${
          day.dayPlan
        }, ${day.accomodation}, 
            ${day.transport}, ${day.country}, ${day.region}, ${
          day.city
        }) RETURNING *;`;
        return res.rows[0];
      })
    );
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
    const itineraryRes = await sql`
    SELECT i.itinerary_id, i.title, i.itinerary_image_url, i.user_id, i.itinerary_description, i.created_at, i.budget, u.username, COALESCE(CAST(SUM(vote_value)AS INTEGER),0) AS total_votes
    FROM itineraries i
    FULL JOIN itinerary_votes v
    ON i.itinerary_id=v.itinerary_id
    INNER JOIN users u
    ON i.user_id=u.user_id
    WHERE i.itinerary_id= ${id}
    GROUP BY i.itinerary_id, u.username`;

    const daysRes = await sql`
    SELECT * FROM days
    WHERE days.itinerary_id= ${id}`;

    const commentsRes = await sql`
    SELECT comments.comment_id, comments.user_id, comments.itinerary_id, comments.comment_body, u.username, comments.created_at FROM comments 
    INNER JOIN users u
    ON comments.user_id=u.user_id
    WHERE comments.itinerary_id= ${id}
    ORDER BY comments.created_at DESC;`;

    const itineraryObject = {
      itineraryInfo: itineraryRes.rows[0],
      itineraryDays: daysRes.rows,
      itineraryComments: commentsRes.rows,
    };

    return itineraryObject;
  } catch (error) {
    console.error("Data fetching error:", error);
    throw new Error("500: Server error");
  }
}
