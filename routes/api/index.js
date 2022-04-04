const router = require('express').Router();
const userRoutes = require('./users-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;