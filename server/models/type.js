const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "type_name_key"
    }
  }, {
    sequelize,
    tableName: 'type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "type_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "type_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
