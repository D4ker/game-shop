const {Router} = require("express");

const router = Router();

const db = require('./models');
const sequelize = require("sequelize");
const {Sequelize} = require("sequelize");

const { game, game_cost, library, wishlist } = require('./models');

db.sequelize.sync()
    .then(result => {
        console.log('Sync Ok');
    })
    .catch(err => {
        console.log(err)
    });

router.get('/select/games', (req, res) => {
    game.hasMany(game_cost, {foreignKey: 'game_id'});
    game_cost.belongsTo(game, {foreignKey: 'id'});
    game.findAll({
        include: [{
            model: game_cost,
            required: true
        }]
    }).then(games => {
        res.status(200).json(games);
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/select/library', (req, res) => {
    // game_cost.hasMany(library, {foreignKey: 'game_cost_id'});
    // library.hasMany(game_cost, {foreignKey: 'id'});

    // game_cost.findAll({
    //     include: [{
    //         model: library,
    //         required: true,
    //         where: {buyer_id: req.body.id}
    //     }]
    // }).then(library => {
    //     res.status(200).json(library);
    // }).catch((err) => {
    //     console.log(err);
    // });

    (async () => {
        await db.sequelize.query(
            `SELECT * FROM game WHERE id IN (SELECT gc.game_id FROM library l 
            JOIN game_cost gc ON l.game_cost_id = gc.id 
            WHERE l.buyer_id = ${req.body.id})`, {
                instance: library,
                model: game,
                mapToModel: true
            }).then(library => {
            res.status(200).json(library);
        }).catch((err) => {
            console.log(err);
        });
    })();
});

router.post('/select/wishlist', (req, res) => {
    // wishlist.findAll({
    //     where: {buyer_id: req.body.id}
    // }).then(wishlist => {
    //     res.status(200).json(wishlist);
    // }).catch((err) => {
    //     console.log(err);
    // });

    (async () => {
        await db.sequelize.query(
            `SELECT * FROM game WHERE id IN 
            (SELECT game_id FROM wishlist w WHERE w.buyer_id = ${req.body.id})`, {
                instance: wishlist,
                model: game,
                mapToModel: true
            }).then(wishlist => {
            res.status(200).json(wishlist);
        }).catch((err) => {
            console.log(err);
        });
    })();
});

module.exports = router;