const { Driver, Team } = require("../db");

const postDriver = async (req, res) => {
  try {
    const { name, surname, description, image, nationality, dob, teams } = req.body;

    if (!name || !surname || !description || !image || !nationality || !dob || !teams || !teams.length) {
      return res.status(400).json({ status: "Missing data" });
    }

    // Find or create the driver in the database
    const [newDriver, created] = await Driver.findOrCreate({
      where: { name: `${name} ${surname}`, nationality, dob },
      defaults: { description, image }
    });

    // Check if the driver was already existing
    if (!created) {
      return res.status(400).json({ status: "Driver already exists" });
    }

    // Find and associate the teams
    const teamInstances = await Team.findAll({
      where: {
        name: teams // Assuming teams is an array of team names
      }
    });

    if (teamInstances && teamInstances.length > 0) {
      await newDriver.addTeams(teamInstances);
    }

    return res.status(201).json({
      status: "Driver created successfully",
      driver: newDriver
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postDriver
};