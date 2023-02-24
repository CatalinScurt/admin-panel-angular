const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController')
const verifyJWTandAdmin = require('../middleware/verifyJWTandAdmin')

router.use(verifyJWTandAdmin)

router.route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.createNewOrder)
    .patch(ordersController.updateOrder)
    .delete(ordersController.deleteOrder)

router.route('/stats').get(ordersController.getStats)

module.exports = router