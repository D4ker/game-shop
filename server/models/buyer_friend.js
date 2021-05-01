const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buyer_friend', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'buyer',
        key: 'id'
      },
      unique: "buyer_friend_buyer_id_friend_id_key"
    },
    friend_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'buyer',
        key: 'id'
      },
      unique: "buyer_friend_buyer_id_friend_id_key"
    }
  }, {
    sequelize,
    tableName: 'buyer_friend',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "buyer_friend_buyer_id_friend_id_key",
        unique: true,
        fields: [
          { name: "buyer_id" },
          { name: "friend_id" },
        ]
      },
      {
        name: "buyer_friend_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
