const { db } = require("@vercel/postgres");
const { birthdayEvents } = require("../app/lib/placeholder-data.js");

async function seedBirthdays(client) {
  try {
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS events(
            id SERIAL PRIMARY KEY,
            month INT NOT NULL,
            day INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            created_at timestamp DEFAULT NOW()
        )
        `;
    console.log(`Created "events" table`);

    const insertedEntries = await Promise.all(
      Object.keys(birthdayEvents).map(async (month, idx) => {
        return Promise.all(
          Object.keys(birthdayEvents[month]).map(async (day, idx) => {
            let events = birthdayEvents[month][day];
            return Promise.all(
              events.map(async (event) => {
                return client.sql`INSERT INTO events(month,day,title)VALUES (${month},${day},${event});`;
              })
            );
          })
        );
      })
    );

    console.log(`Seeded ${insertedEntries.length} events`);
    return { createTable, events: insertedEntries };
  } catch (error) {
    console.log("Error while seeding birthday data: ", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedBirthdays(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    `An error occurred while attempting to seed the database:`,
    err
  );
});
