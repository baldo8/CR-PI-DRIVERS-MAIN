const getAllDrivers = require("../utils/getDriverU");

const getDriverByName = async (req, res) => {
  const { name } = req.query;

  try {
    const drivers = await getAllDrivers();
    // Create a regular expression pattern to match the search query at the start of the driver name i flag is used to perform a case-insensitive ^ symbol, which matches the start of the driver name
    const pattern = new RegExp(`^${name}`, 'i');
  
     // Filter the drivers by name using the regular expression pattern The test method of the regular expression pattern is then used to check if the driver name matches the search pattern.
     const filteredDrivers = drivers.filter((driver) =>
     pattern.test(driver.name)
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