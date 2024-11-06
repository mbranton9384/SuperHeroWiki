// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('superherousers', 'mike', 'super', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433, 
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

module.exports = sequelize;


