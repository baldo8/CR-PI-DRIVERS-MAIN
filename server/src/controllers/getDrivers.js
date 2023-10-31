
const getAllDrivers = require("../utils/getDriverU");

const getDrivers = async (req, res) => {
  try {
 
    const data = await getAllDrivers()
   

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


module.exports = {
  getDrivers,
}