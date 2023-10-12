const axios = require("axios");
const { Team } = require("../db.js");


const getTeams = async (req, res) => {
    try {
      // Make a request to the API to get the drivers data
      const { data } = await axios.get("http://localhost:5000/drivers");
  
      // Extract the teams from the drivers data
      const teams = data.map((driver) => driver.teams?.split(", ") ?? []);
  
      // Flatten the teams array into a single array
      const flattenedTeams = teams.flat();
  
      // Remove duplicates from the flattened teams array using Set and Array.from methods
      const uniqueTeams = Array.from(new Set(flattenedTeams));
  
      // Save the unique teams to the teams table in the database
      for (let i = 0; i < uniqueTeams.length; i++) {
        await Team.findOrCreate({ where: { name: uniqueTeams[i] } });
      }
  
      // Return a success message
      return res.status(200).json({ message: "Teams created successfully" });
    } catch (error) {
      // Handle any errors
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getTeams,
  };