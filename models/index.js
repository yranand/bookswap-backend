const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

// Prefer single connection URL via MYSQL_URL when provided by hosting platform
const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

const sequelize = connectionUrl
  ? new Sequelize(connectionUrl, { ...config })
  : new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


