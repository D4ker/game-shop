const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('library', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'buyer',
        key: 'id'
      },
      unique: "library_buyer_id_game_cost_id_key"
    },
    game_cost_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'game_cost',
        key: 'id'
      },
      unique: "library_buyer_id_game_cost_id_key"
    },
    timestamp_of_purchase: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'library',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "library_buyer_id_game_cost_id_key",
        unique: true,
        fields: [
          { name: "buyer_id" },
          { name: "game_cost_id" },
        ]
      },
      {
        name: "library_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
