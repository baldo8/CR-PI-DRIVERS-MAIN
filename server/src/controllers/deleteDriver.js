const { Driver } = require("../db");

const deleteDriver = async (req, res) => {
  const { idDriver } = req.params;

  if ( idDriver >= 1 && idDriver <= 508) {
    // Handle deletion of API drivers differently
    return res.status(409).json({ message: "Cannot delete API drivers" });
  }

  const data = await Driver.findOne({ where: { id: idDriver } });

  if (!data) {
    return res.status(404).json({ message: "Driver not found" });
  }

  try {
    await Driver.destroy({ where: { id: idDriver } });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  deleteDriver,
};