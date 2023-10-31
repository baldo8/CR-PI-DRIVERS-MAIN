

const getAllDrivers = require("../utils/getDriverU");

const getDriverById = async (req, res) => {
    const { id } = req.params;
    try {
        data = await getAllDrivers();
       // match the driver by id so that we can return the driver needed
        const matchedDriver = data.find((driver) => {
            return driver.id == id;
          });
          if (matchedDriver) {
            return res.status(200).json(matchedDriver);
          } else {
            return res
              .status(404)
              .json({ message: "Driver not found by id" });
          }


    } catch (error) {
        return res.status(500).send(error.message);
        
    }
}

module.exports = { getDriverById };