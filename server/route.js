const {Router} = require("express");

const router = Router();

const controller = require('./routeController');

const authMiddleware = require('./middleware/authMiddleware');

router.post('/registration', controller.registration);

router.post('/login', controller.login);

router.get('/check/token', authMiddleware, controller.checkToken);

router.get('/select/countries', controller.selectCountries);

router.get('/select/games', controller.selectGames);

router.get('/select/library', authMiddleware, controller.selectLibrary);

router.get('/select/wishlist', authMiddleware, controller.selectWishlist);

router.post('/insert/library', authMiddleware, controller.insertLibrary);

router.post('/insert/wishlist', authMiddleware, controller.insertWishlist);

router.delete('/delete/wishlist', authMiddleware, controller.deleteWishlist);

module.exports = router;