const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buyer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "buyer_login_key"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "buyer_phone_number_key"
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "buyer_email_key"
    },
    cash: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'buyer',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "buyer_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "buyer_login_key",
        unique: true,
        fields: [
          { name: "login" },
        ]
      },
      {
        name: "buyer_phone_number_key",
        unique: true,
        fields: [
          { name: "phone_number" },
        ]
      },
      {
        name: "buyer_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
