const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "country_name_key"
    }
  }, {
    sequelize,
    tableName: 'country',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "country_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "country_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
