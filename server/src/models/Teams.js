const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Team', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4 // if id is not provided, sequelize will generate one uuidv4 is vary rare to have same id
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
      
    },{ timestamps: false });
}