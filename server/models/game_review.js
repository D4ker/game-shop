const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_review', {
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
      unique: "game_review_game_id_buyer_id_key"
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'buyer',
        key: 'id'
      },
      unique: "game_review_game_id_buyer_id_key"
    },
    text: {
      type: DataTypes.STRING(5000),
      allowNull: false
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'game_review',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_review_game_id_buyer_id_key",
        unique: true,
        fields: [
          { name: "game_id" },
          { name: "buyer_id" },
        ]
      },
      {
        name: "game_review_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
