const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyJWTAndAdmin = require('../middleware/verifyJWTandAdmin')

router.use(verifyJWTAndAdmin)

router.route('/')
    .get(productsController.getAllProducts)
    .post(productsController.createNewProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)

module.exports = router