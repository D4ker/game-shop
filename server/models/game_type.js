const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_type', {
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
      unique: "game_type_game_id_type_id_key"
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'type',
        key: 'id'
      },
      unique: "game_type_game_id_type_id_key"
    }
  }, {
    sequelize,
    tableName: 'game_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_type_game_id_type_id_key",
        unique: true,
        fields: [
          { name: "game_id" },
          { name: "type_id" },
        ]
      },
      {
        name: "game_type_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
