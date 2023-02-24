const Product = require('../models/Product')

// @desc Get all products 
// @route GET /products
// @access Private
const getAllProducts = async (req, res) => {
    // Get all products from MongoDB
    const products = await Product.find().lean()

    // If no products 
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' })
    }

    res.json(products)
}
// @desc Create new product
// @route POST /products
// @access Private
const createNewProduct = async (req, res) => {
    const product = req.body
    const { _id, id, title, description, price, discountPercentage, rating, seller, stock, brand, category, thumbnail, images } = product

    if (!title || !description || !price || !discountPercentage || !seller || !stock || !brand || !category || !thumbnail || !images?.length) {
        res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicateTitle = await Product.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()
    const duplicateId = await Product.findOne({ id }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicateTitle || duplicateId) {
        return res.status(409).json({ message: 'Duplicate product title or id' })
    }

    // Create and store the new product
    const newProduct = await Product.create(product)

    if (newProduct) { // Created 
        return res.status(201).json({ message: 'New product created' })
    } else {
        return res.status(400).json({ message: 'Invalid product data received' })
    }

}

// @desc Update a product
// @route PATCH /products
// @access Private
const updateProduct = async (req, res) => {
    const product = req.body
    const { _id, id, title, description, price, discountPercentage, rating, seller, stock, brand, category, thumbnail, images } = product

    if (!title || !description || !price || !discountPercentage || !seller || !stock || !brand || !category || !thumbnail || !images?.length) {
        res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm product exists to update
    const newProduct = await Product.findById(_id).exec()

    if (!newProduct) {
        return res.status(400).json({ message: 'Product not found' })
    }

    // Check for duplicate title
    const duplicateTitle = await Product.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()
    const duplicateId = await Product.findOne({ id }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (id !== product.id && duplicateId) {
        return res.status(409).json({ message: 'Duplicate product id' })
    }

    if (title !== product.title && duplicateTitle) {
        return res.status(409).json({ message: 'Duplicate product title' })
    }

    newProduct.id = product.id
    newProduct.title = product.title
    newProduct.description = product.description
    newProduct.price = product.price
    newProduct.discountPercentage = product.discountPercentage
    newProduct.rating = product.rating
    newProduct.seller = product.seller
    newProduct.stock = product.stock
    newProduct.brand = product.brand
    newProduct.category = product.category
    newProduct.thumbnail = product.thumbnail
    newProduct.images = product.images


    const updatedProduct = await newProduct.save()

    res.json(`'${updatedProduct.title}' updated`)
}

// @desc Delete a product
// @route DELETE /products
// @access Private
const deleteProduct = async (req, res) => {
    const id = req.body.data

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Product ID required' })
    }

    // Confirm product exists to delete 
    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()

    const reply = `Product '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
}