const express = require('express')
const router = express.Router()

const asRouter = require('./as')
router.use('/as', asRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
