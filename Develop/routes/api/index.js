const router = require('express').Router();
const usersRoutes = require('./user');
const thoughtsRoutes = require('./thoughts');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;
