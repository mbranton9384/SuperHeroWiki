const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SavedHero = sequelize.define('SavedHero', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    field: 'user_id', 
  },
  hero_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'hero_id',
  },
  hero_data: {
    type: DataTypes.JSONB,
    allowNull: false,
    field: 'hero_data',
  },
  saved_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'saved_at',
  },
}, {
  tableName: 'saved_heroes',
  timestamps: false,
});

module.exports = SavedHero;










