const { db } = require("@vercel/postgres");
const {
  users,
  itineraries,
  days,
  comments,
  itinerary_votes,
} = require("../lib/placeholder-data");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    const createTable = await client.sql`CREATE TABLE users (
              user_id SERIAL PRIMARY KEY,
              username VARCHAR(20) NOT NULL UNIQUE,
              email VARCHAR(30) NOT NULL UNIQUE,
              password VARCHAR NOT NULL,
              bio VARCHAR(1000),
              avatar_img_url VARCHAR
          );`;
    console.log("Created users table");
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
                INSERT INTO users (username,email,password,bio,avatar_img_url)
                VALUES (${user.username}, ${user.email}, ${hashedPassword}, ${user.bio}, ${user.avatar_img_url});`;
      })
    );
    console.log(`Seeded ${insertedUsers.length} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedItineraries(client) {
  try {
    const createTable = await client.sql`CREATE TABLE itineraries (
              itinerary_id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
              itinerary_description VARCHAR,
              created_at TIMESTAMP DEFAULT NOW(),
              budget INT NOT NULL,
              CHECK (budget BETWEEN 1 AND 3)
);`;
    console.log("Created itineraries table");
    const insertedItineraries = await Promise.all(
      itineraries.map(async (itinerary) => {
        return client.sql`
                INSERT INTO itineraries (user_id, itinerary_description, created_at, budget)
                VALUES (${itinerary.user_id}, ${itinerary.itinerary_description},  ${itinerary.created_at}, ${itinerary.budget});`;
      })
    );
    console.log(`Seeded ${insertedItineraries.length} itineraries`);
  } catch (error) {
    console.error("Error seeding itineraries:", error);
    throw error;
  }
}

async function seedDays(client) {
  try {
    const createTable = await client.sql`CREATE TABLE days (
            day_id SERIAL PRIMARY KEY,
            itinerary_id INT REFERENCES itineraries(itinerary_id) ON DELETE CASCADE NOT NULL,
            day_number INT NOT NULL,
            day_plan VARCHAR NOT NULL,
            accomodation VARCHAR(150),
            transport VARCHAR(150),
            country VARCHAR(150) NOT NULL,
            region VARCHAR(150) NOT NULL,
            place VARCHAR(150)
                    );`;
    console.log("Created days table");
    const insertedDays = await Promise.all(
      days.map(async (day) => {
        return client.sql`
            INSERT INTO days (itinerary_id, day_number, day_plan, accomodation, transport, country, region, place)
            VALUES (${day.itinerary_id}, ${day.day_number},  ${day.day_plan}, ${day.accomodation}, 
            ${day.transport}, ${day.country}, ${day.region}, ${day.place});`;
      })
    );
    console.log(`Seeded ${insertedDays.length} days`);
  } catch (error) {
    console.error("Error seeding days:", error);
    throw error;
  }
}

async function seedComments(client) {
  try {
    const createTable = await client.sql`CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
            itinerary_id INT REFERENCES itineraries(itinerary_id) ON DELETE CASCADE NOT NULL,
            comment_body VARCHAR(300),
            created_at TIMESTAMP DEFAULT NOW()
        );`;
    console.log("Created comments table");

    const insertedComments = await Promise.all(
      comments.map(async (comment) => {
        return client.sql`
            INSERT INTO comments (user_id, itinerary_id, comment_body, created_at)
            VALUES (${comment.user_id},  ${comment.itinerary_id}, ${comment.comment_body}, ${comment.created_at});`;
      })
    );
    console.log(`Seeded ${insertedComments.length} comments`);
  } catch (error) {
    console.error("Error seeding comments:", error);
    throw error;
  }
}

async function seedItineraryVotes(client) {
  try {
    const createTable = await client.sql`CREATE TABLE itinerary_votes (
            vote_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
            itinerary_id INT REFERENCES itineraries(itinerary_id) ON DELETE CASCADE NOT NULL,
            vote_value INT NOT NULL
        );`;
    console.log("Created itinerary_votes table");

    const insertedItineraryVotes = await Promise.all(
      itinerary_votes.map(async (itinerary_vote) => {
        return client.sql`
            INSERT INTO itinerary_votes (user_id, itinerary_id, vote_value)
            VALUES (${itinerary_vote.user_id},  ${itinerary_vote.itinerary_id}, ${itinerary_vote.vote_value});`;
      })
    );
    console.log(`Seeded ${insertedItineraryVotes.length} itinerary votes`);
  } catch (error) {
    console.error("Error seeding itinerary_votes:", error);
    throw error;
  }
}
async function main() {
  const client = await db.connect();
  await client.sql`DROP TABLE IF EXISTS itinerary_votes;`;
  await client.sql`DROP TABLE IF EXISTS comments;`;
  await client.sql`DROP TABLE IF EXISTS days;`;
  await client.sql`DROP TABLE IF EXISTS itineraries;`;
  await client.sql`DROP TABLE IF EXISTS users;`;
  await seedUsers(client);
  await seedItineraries(client);
  await seedDays(client);
  await seedComments(client);
  await seedItineraryVotes(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
