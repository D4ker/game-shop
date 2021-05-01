const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_cost', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'game',
        key: 'id'
      },
      unique: "game_cost_game_id_country_id_timestamp_of_price_update_key"
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      },
      unique: "game_cost_game_id_country_id_timestamp_of_price_update_key"
    },
    cost: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    timestamp_of_price_update: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: "game_cost_game_id_country_id_timestamp_of_price_update_key"
    }
  }, {
    sequelize,
    tableName: 'game_cost',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_cost_game_id_country_id_timestamp_of_price_update_key",
        unique: true,
        fields: [
          { name: "game_id" },
          { name: "country_id" },
          { name: "timestamp_of_price_update" },
        ]
      },
      {
        name: "game_cost_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
