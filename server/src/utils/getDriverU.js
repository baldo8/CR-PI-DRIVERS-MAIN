const { default: axios } = require("axios");
const { teamsU } = require("./teamsU");
const { Driver, Team } = require("../db");


async function getAllDrivers(){

    let drivers = [];
    // Make a request to the API to get the drivers data 
    const { data } = await axios.get("http://localhost:5000/drivers");
    // Extract the teams from the drivers data then process them to obtain the team names from the teams table so that they can be saved in the drivers table
    for (let i = 0; i < data.length; i++) {
      const driver = {
        id: data[i].id,
        name: `${data[i].name.forename} ${data[i].name.surname}`,
        image: data[i].image,
        dob: data[i].dob,
        nationality: data[i].nationality,
        teams: data[i].teams ? teamsU(data[i].teams) : [], // sets the team names from the teams table if they exist and if not sets an empty array
        description: data[i].description,
      };

      if (!driver.image.url.length) {
        driver.image.url =
          "https://mcdn.wallpapersafari.com/medium/23/33/hBp34Q.jpg";
        driver.image.imageby = "saviero bien perro!";
      }
      drivers.push(driver);
    }
   
    const driverDB = await Driver.findAll({
      include: [
        { model: Team, attributes: ['name'] }
      ],
      attributes: ['id', 'name', 'description', 'image', 'nationality', 'dob'],// attributes option sets especific attributes from the drivers table
    }).then((drivers) => {
      return drivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        image: driver.image,
        nationality: driver.nationality,
        dob: driver.dob,
        teams: driver.Teams.map((team) => team.name),// sets the team names from the teams table 
      }));
    });

    return [...drivers, ...driverDB]
} 

module.exports = getAllDrivers