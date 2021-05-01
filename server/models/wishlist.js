const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wishlist', {
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
      unique: "wishlist_buyer_id_game_id_key"
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'game',
        key: 'id'
      },
      unique: "wishlist_buyer_id_game_id_key"
    }
  }, {
    sequelize,
    tableName: 'wishlist',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wishlist_buyer_id_game_id_key",
        unique: true,
        fields: [
          { name: "buyer_id" },
          { name: "game_id" },
        ]
      },
      {
        name: "wishlist_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
