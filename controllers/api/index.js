const router = require('express').Router();
const userRoutes = require('./user-routes')
const bookRoutes = require('./fav-routes')

router.use('/', userRoutes)
router.use('/fav-list', bookRoutes)

module.exports = router