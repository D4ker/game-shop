const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "game_name_date_of_release_key"
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: false
    },
    date_of_release: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: "game_name_date_of_release_key"
    }
  }, {
    sequelize,
    tableName: 'game',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_name_date_of_release_key",
        unique: true,
        fields: [
          { name: "name" },
          { name: "date_of_release" },
        ]
      },
      {
        name: "game_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
