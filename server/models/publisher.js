const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publisher', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "publisher_name_key"
    },
    info: {
      type: DataTypes.STRING(5000),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'publisher',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "publisher_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "publisher_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
