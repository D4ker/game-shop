const db = require('./models');
const {Op} = require("sequelize");
const {QueryTypes} = require("sequelize");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('./config/config');

const SALT = 7;
const EXPIRES_IN = "24h";

const {buyer, game, game_cost, library, wishlist, country} = require('./models');

db.sequelize.sync()
    .then(result => {
        console.log('Sync Ok');
    })
    .catch(err => {
        console.log(err);
    });

const generateAccessToken = (id) => {
    const payload = {
        id: id
    }
    return jwt.sign(payload, secret, {expiresIn: EXPIRES_IN});
}

class routeController {
    async registration(req, res) {
        try {
            let {login, password, first_name, last_name, phone_number, birth, country_id, email} = req.body;
            let userDB = await buyer.findOne({
                where: {
                    [Op.or]: [
                        {login: login},
                        {phone_number: phone_number},
                        {email: email}
                    ]
                }
            });

            if (userDB === null) {
                const user = await buyer.create({
                    login: login,
                    password: bcrypt.hashSync(password, SALT),
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: phone_number,
                    birth: birth,
                    country_id: country_id,
                    email: email,
                    cash: 0
                });

                const token = generateAccessToken(user.id);

                res.status(200).json({
                    token
                });
            } else {
                return res.status(400).json({message: 'Ошибка регистрации. ' +
                        'Пользователь с таким логином/паролем/телефоном уже существует'});
            }
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: 'Ошибка регистрации'});
        }
    }

    async login(req, res) {
        try {
            let {login, password} = req.body;
            let userDB = await buyer.findOne({
                where: {
                    login: login
                }
            });

            if (userDB === null) {
                return res.status(400).json({message: 'Ошибка авторизации: Неверный логин или пароль'});
            }

            let validPassword = bcrypt.compareSync(password, userDB.password);
            if (!validPassword) {
                return res.status(400).json({message: 'Ошибка авторизации: Неверный логин или пароль'});
            }

            const token = generateAccessToken(userDB.id);

            res.status(200).json({
                token
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: 'Ошибка авторизации'});
        }
    }

    async checkToken(req, res) {
        res.status(200).json({message: 'Успешная авторизация'});
    }

    async selectCountries(req, res) {
        await country.findAll().then(countriesDB => {
            return res.status(200).json(countriesDB);
        }).catch((e) => {
            console.log(e);
            return res.status(500).json({message: 'Ошибка при получении стран'});
        });
    }

    async selectGames(req, res) {
        game.hasMany(game_cost, {foreignKey: 'game_id'});
        game_cost.belongsTo(game, {foreignKey: 'id'});
        await game.findAll({
            include: [{
                model: game_cost,
                required: true
            }]
        }).then(gamesDB => {
            return res.status(200).json(gamesDB);
        }).catch((e) => {
            console.log(e);
            return res.status(500).json({message: 'Ошибка при получении списка игр'});
        });
    }

    async selectLibrary(req, res) {
        await db.sequelize.query(
            `SELECT * FROM game WHERE id IN (SELECT gc.game_id FROM library l
             JOIN game_cost gc ON l.game_cost_id = gc.id 
             WHERE l.buyer_id = ${req.user.id})`, {
                instance: library,
                model: game,
                mapToModel: true
            }).then(libraryDB => {
                return res.status(200).json(libraryDB);
            }).catch((e) => {
                console.log(e);
                return res.status(500).json({message: 'Ошибка при получении библиотеки'});
            });
    }

    async selectWishlist(req, res) {
        await db.sequelize.query(
            `SELECT * FROM game WHERE id IN
             (SELECT game_id FROM wishlist w WHERE w.buyer_id = ${req.user.id})`, {
                instance: wishlist,
                model: game,
                mapToModel: true
            }).then(wishlistDB => {
                return res.status(200).json(wishlistDB);
            }).catch((err) => {
                console.log(err);
                return res.status(500).json({message: 'Ошибка при получении списка желаемого'});
            });
    }

    async insertLibrary(req, res) {
        try {
            let buyerDB = await db.sequelize.query(
                `SELECT * FROM buyer WHERE id = ${req.user.id}`, {
                    model: buyer,
                    mapToModel: true
                });

            let gameCostDB = await db.sequelize.query(
                `SELECT * FROM game_cost WHERE id = ${req.body.game_cost_id}`, {
                    model: game_cost,
                    mapToModel: true
                });

            let cash = parseFloat(buyerDB[0].cash.replace(/[^0-9.,]/g, '').replace(/,/, '.'));
            let cost = parseFloat(gameCostDB[0].cost.replace(/[^0-9.,]/g, '').replace(/,/, '.'));

            if (gameCostDB[0].discount !== null) {
                let costWithDiscount = cost * (1 - parseInt(gameCostDB[0].discount) / 100);
                if (cash >= costWithDiscount) {
                    cash -= costWithDiscount;
                } else {
                    return res.status(402).json({message: 'Ошибка при покупке игры: Недостаточно средств'});
                }
            } else if (cash >= cost) {
                cash -= cost;
            } else {
                return res.status(402).json({message: 'Ошибка при покупке игры: Недостаточно средств'});
            }

            const result = await db.sequelize.transaction(async (t) => {
                try {
                    await db.sequelize.query(
                        `UPDATE buyer SET cash = ${cash} WHERE id = ${req.user.id}`, {
                            type: QueryTypes.UPDATE,
                            transaction: t,
                            model: buyer,
                            mapToModel: true
                        });

                    await db.sequelize.query(
                        `INSERT INTO library (buyer_id, game_cost_id, timestamp_of_purchase)
                     VALUES (${req.user.id}, ${req.body.game_cost_id}, 
                     to_timestamp(${Date.now()} / 1000.0))`, {
                            type: QueryTypes.INSERT,
                            transaction: t,
                            model: library,
                            mapToModel: true
                        });
                    return res.status(200).json({message: 'Игра успешно приобретена'});
                } catch (e) {
                    await t.rollback();
                    return res.status(500).json({message: 'Ошибка при покупке игры'});
                }
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Ошибка при покупке игры'});
        }
    }

    async insertWishlist(req, res) {
        await db.sequelize.query(
            `INSERT INTO wishlist (buyer_id, game_id)
             VALUES (${req.user.id}, ${req.body.game_id})`, {
                model: wishlist,
                mapToModel: true
            }).then(wishlistDB => {
                return res.status(200).json({message: 'Игра успешно добавлена в список желаемого'});
            }).catch((err) => {
                console.log(err);
                return res.status(500).json({message: 'Ошибка при добавлении игры в список желаемого'});
            });
    }

    async deleteWishlist(req, res) {
        await db.sequelize.query(
            `DELETE FROM wishlist
             WHERE buyer_id = ${req.user.id} AND game_id = ${req.body.game_id}`, {
                model: wishlist,
                mapToModel: true
            }).then(wishlistDB => {
                return res.status(200).json({message: 'Игра успешно удалена из списка желаемого'});
            }).catch((err) => {
                console.log(err);
                return res.status(500).json({message: 'Ошибка при удалении игры из списка желаемого'});
            });
    }
}

module.exports = new routeController();