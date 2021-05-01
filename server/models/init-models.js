var DataTypes = require("sequelize").DataTypes;
var _buyer = require("./buyer");
var _buyer_friend = require("./buyer_friend");
var _country = require("./country");
var _developer = require("./developer");
var _game = require("./game");
var _game_cost = require("./game_cost");
var _game_developer = require("./game_developer");
var _game_publisher = require("./game_publisher");
var _game_review = require("./game_review");
var _game_type = require("./game_type");
var _library = require("./library");
var _publisher = require("./publisher");
var _type = require("./type");
var _wishlist = require("./wishlist");

function initModels(sequelize) {
  var buyer = _buyer(sequelize, DataTypes);
  var buyer_friend = _buyer_friend(sequelize, DataTypes);
  var country = _country(sequelize, DataTypes);
  var developer = _developer(sequelize, DataTypes);
  var game = _game(sequelize, DataTypes);
  var game_cost = _game_cost(sequelize, DataTypes);
  var game_developer = _game_developer(sequelize, DataTypes);
  var game_publisher = _game_publisher(sequelize, DataTypes);
  var game_review = _game_review(sequelize, DataTypes);
  var game_type = _game_type(sequelize, DataTypes);
  var library = _library(sequelize, DataTypes);
  var publisher = _publisher(sequelize, DataTypes);
  var type = _type(sequelize, DataTypes);
  var wishlist = _wishlist(sequelize, DataTypes);

  buyer_friend.belongsTo(buyer, { as: "buyer", foreignKey: "buyer_id"});
  buyer.hasMany(buyer_friend, { as: "buyer_friends", foreignKey: "buyer_id"});
  buyer_friend.belongsTo(buyer, { as: "friend", foreignKey: "friend_id"});
  buyer.hasMany(buyer_friend, { as: "friend_buyer_friends", foreignKey: "friend_id"});
  game_review.belongsTo(buyer, { as: "buyer", foreignKey: "buyer_id"});
  buyer.hasMany(game_review, { as: "game_reviews", foreignKey: "buyer_id"});
  library.belongsTo(buyer, { as: "buyer", foreignKey: "buyer_id"});
  buyer.hasMany(library, { as: "libraries", foreignKey: "buyer_id"});
  wishlist.belongsTo(buyer, { as: "buyer", foreignKey: "buyer_id"});
  buyer.hasMany(wishlist, { as: "wishlists", foreignKey: "buyer_id"});
  buyer.belongsTo(country, { as: "country", foreignKey: "country_id"});
  country.hasMany(buyer, { as: "buyers", foreignKey: "country_id"});
  game_cost.belongsTo(country, { as: "country", foreignKey: "country_id"});
  country.hasMany(game_cost, { as: "game_costs", foreignKey: "country_id"});
  game_developer.belongsTo(developer, { as: "developer", foreignKey: "developer_id"});
  developer.hasMany(game_developer, { as: "game_developers", foreignKey: "developer_id"});
  game_cost.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(game_cost, { as: "game_costs", foreignKey: "game_id"});
  game_developer.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(game_developer, { as: "game_developers", foreignKey: "game_id"});
  game_publisher.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(game_publisher, { as: "game_publishers", foreignKey: "game_id"});
  game_review.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(game_review, { as: "game_reviews", foreignKey: "game_id"});
  game_type.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(game_type, { as: "game_types", foreignKey: "game_id"});
  wishlist.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(wishlist, { as: "wishlists", foreignKey: "game_id"});
  library.belongsTo(game_cost, { as: "game_cost", foreignKey: "game_cost_id"});
  game_cost.hasMany(library, { as: "libraries", foreignKey: "game_cost_id"});
  game_publisher.belongsTo(publisher, { as: "publisher", foreignKey: "publisher_id"});
  publisher.hasMany(game_publisher, { as: "game_publishers", foreignKey: "publisher_id"});
  game_type.belongsTo(type, { as: "type", foreignKey: "type_id"});
  type.hasMany(game_type, { as: "game_types", foreignKey: "type_id"});

  return {
    buyer,
    buyer_friend,
    country,
    developer,
    game,
    game_cost,
    game_developer,
    game_publisher,
    game_review,
    game_type,
    library,
    publisher,
    type,
    wishlist,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
