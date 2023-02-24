const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWTandAdmin = require('../middleware/verifyJWTandAdmin')

router.use(verifyJWTandAdmin)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/stats').get(usersController.getStats)

module.exports = router
