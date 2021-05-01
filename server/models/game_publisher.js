const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_publisher', {
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
      unique: "game_publisher_game_id_publisher_id_key"
    },
    publisher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'publisher',
        key: 'id'
      },
      unique: "game_publisher_game_id_publisher_id_key"
    }
  }, {
    sequelize,
    tableName: 'game_publisher',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_publisher_game_id_publisher_id_key",
        unique: true,
        fields: [
          { name: "game_id" },
          { name: "publisher_id" },
        ]
      },
      {
        name: "game_publisher_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
