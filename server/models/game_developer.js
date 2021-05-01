const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_developer', {
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
      unique: "game_developer_game_id_developer_id_key"
    },
    developer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'developer',
        key: 'id'
      },
      unique: "game_developer_game_id_developer_id_key"
    }
  }, {
    sequelize,
    tableName: 'game_developer',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_developer_game_id_developer_id_key",
        unique: true,
        fields: [
          { name: "game_id" },
          { name: "developer_id" },
        ]
      },
      {
        name: "game_developer_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
