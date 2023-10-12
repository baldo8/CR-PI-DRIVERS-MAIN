const getAllDrivers = require("../utils/getDriverU");

const getDriverByName = async (req, res) => {
  const { name } = req.query;

  try {
    const drivers = await getAllDrivers();
    const filteredDrivers = drivers.filter((driver) =>
      driver.name.toLowerCase() == name.toLowerCase()
    );

    if (filteredDrivers.length === 0) {
      return res.status(404).json({ message: "No drivers found with the given name." });
    }

    return res.status(200).json(filteredDrivers.slice(0, 15));
  } catch (error) {
    return res.status(500).json({ message: "Failed to get drivers by name", error: error.message });
  }
};

module.exports = { getDriverByName };