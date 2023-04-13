const axios = require('axios');
const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_DATABASE,
  API_KEY_COLLEGIATE,
  API_KEY_INTERMEDIATE,
} = process.env;

async function updateMoodDescriptions() {
  // Connect to the database
  const connection = await mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    port: DB_PORT,
    password: DB_PASSWORD,
  });

  // Update descriptions for each table
  await updateTableMoodDescriptions(connection, 'moods');
  await updateTableMoodDescriptions(connection, 'sub_moods', 'subMoodId', 'subMoodName', 'subMoodDesc');
  await updateTableMoodDescriptions(connection, 'sub_sub_moods', 'subSubMoodId', 'subSubMoodName', 'subSubMoodDesc');
}

async function updateTableMoodDescriptions(connection, tableName, idColumn = 'moodId', nameColumn = 'moodName', descColumn = 'moodDesc') {
  // Fetch all records from the specified table
  const [moods] = await connection.query(`SELECT ${idColumn}, ${nameColumn} FROM ${tableName}`);

  // Use a 'for..of' loop to create variable mood for each item in the moods array. Completes loop sequentially w/ await keyword
  for (const mood of moods) {
    try {
      // Make an API call to the dictionary API
      const response = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${mood[nameColumn]}?key=${API_KEY_COLLEGIATE}`);

      // Check if the response has the expected data
      if (response.data && Array.isArray(response.data) && response.data[0] && response.data[0].shortdef && Array.isArray(response.data[0].shortdef)) {
        // Get the description from the response
        const description = response.data[0].shortdef[0];

        // Update the moodDesc in the table with the fetched description
        await connection.execute(`UPDATE ${tableName} SET ${descColumn}=? WHERE ${idColumn}=?`, [description, mood[idColumn]]);
      } else {
        console.error(`Unexpected response format for mood: ${mood[nameColumn]}`);
      }
    } catch (error) {
      console.error(`Error fetching description for mood: ${mood[nameColumn]}, error: ${error}`);
    }
  }
}

updateMoodDescriptions().catch((error) => console.error(error));
