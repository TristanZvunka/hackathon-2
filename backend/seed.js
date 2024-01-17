/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    /* ************************************************************************* */

    const queriesEmail = [];

    // Insert fake data into the 'email' table
    for (let i = 0; i < 50; i += 1) {
      queriesEmail.push(
        database.query("insert into email(email) values (?)", [
          faker.lorem.words({ min: 1, max: 3 }),
        ])
      );
    }

    // Wait for all the insertion queries to complete
    await Promise.all(queriesEmail);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
