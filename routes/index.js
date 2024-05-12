const router = require('express').Router()
const thoughtApiRoutes = require('./api/thought_route')
const userApiRoutes = require('./api/user_route')

router.use('/api', [thoughtApiRoutes, userApiRoutes])

module.exports = router