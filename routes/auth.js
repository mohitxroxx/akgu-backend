const router = require('express').Router()
const authController = require('../controllers/auth')
const authorization = require('../middlewares/authorization')

router.post('/login', authController.login)

router.get('/logout', authController.logout)

router.post('/signup', authorization('admin'), authController.signup)

router.post('/pass/update', authorization('admin'), authController.updatePassword)

module.exports = router
 