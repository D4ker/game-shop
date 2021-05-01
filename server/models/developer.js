const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('developer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "developer_name_key"
    },
    info: {
      type: DataTypes.STRING(5000),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'developer',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "developer_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "developer_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
