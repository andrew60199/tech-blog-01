require('dotenv').config();

const Sequelize = require('sequelize');

// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'mysql',
//     });

const PORT = process.env.PORT || 3001

const sequelize = `0.0.0.0:${PORT}`
  ? new Sequelize(`0.0.0.0:${PORT}`)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
    });


// No need to authenticate the connection since they do it automatically 

module.exports = sequelize;
