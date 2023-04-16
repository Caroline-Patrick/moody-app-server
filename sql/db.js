// db.js

require("dotenv").config();

const { Sequelize, Model, DataTypes } = require('sequelize');
const {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE} =process.env
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql' // Change to the appropriate dialect for your database
  });
  
  class Emotion extends Model {}
  
  Emotion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Emotion',
    tableName: 'emotions'
  });
  
  Emotion.hasMany(Emotion, { foreignKey: 'parent_id', as: 'children' });
  
  module.exports = { sequelize, Emotion };
  