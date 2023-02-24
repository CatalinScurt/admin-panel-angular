const Order = require('../models/Order')
const User = require('../models/User')
const Product = require('../models/Product')

// @desc Get all orders 
// @route GET /orders
// @access Private
const getAllOrders = async (req, res) => {
    // Get all orders from MongoDB
    const orders = await Order.find().lean()

    // If no orders 
    if (!orders?.length) {
        return res.status(400).json({ message: 'No orders found' })
    }

    // Add username to each order before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const ordersWithUserAndProduct = await Promise.all(orders.map(async (order) => {
        const user = await User.findById(order.user).lean().exec()

        let products = []
        await Promise.all(order.products.map(async (product) => {
            products.push(await Product.findById(product.productId).lean().exec())
        }))

        const productsTitle = []
        products.forEach(element => {
            productsTitle.push(element?.title)
        });
        //const products = await Product.findById(order.products.foreach(product => product.productId).lean().exec())
        return { ...order, productsTitle: productsTitle, username: user.username }
    }))
    res.json(ordersWithUserAndProduct)
}

// @desc Create new order
// @route POST /orders
// @access Private
const createNewOrder = async (req, res) => {
    const { id, user, products, amount, address } = req.body
    console.log(req.body)
    // Confirm data
    if (!user || !products || !amount || !address) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new order
    const order = await Order.create({ user, products, amount, address, 'status': 'pending' })

    if (order) { // Created 
        return res.status(201).json({ message: 'New order created' })
    } else {
        return res.status(400).json({ message: 'Invalid order data received' })
    }

}

// @desc Update a order
// @route PATCH /orders
// @access Private
const updateOrder = async (req, res) => {
    const { _id, amount, address, status } = req.body

    // Confirm data
    if (!_id || !amount || !address || !status) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm order exists to update
    const order = await Order.findById(_id).exec()

    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    order.amount = amount
    order.address = address
    order.status = status

    const updatedOrder = await order.save()

    res.json(`Order updated`)
}

// @desc Delete a order
// @route DELETE /orders
// @access Private
const deleteOrder = async (req, res) => {
    const id = req.body.data

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Order ID required' })
    }

    // Confirm order exists to delete 
    const order = await Order.findById(id).exec()

    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    const result = await order.deleteOne()

    const reply = `Order with ID ${result._id} deleted`

    res.json(reply)
}


// @desc Get Stats
// @route GET /orders/stats
// @access Private
const getStats = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    //const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()));
    //console.log(date, '/', lastMonth, '/', previousMonth)
    try {
        const data = await Order.aggregate([
            { $match: { createdAt: { $gte: lastMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAllOrders,
    createNewOrder,
    updateOrder,
    deleteOrder,
    getStats
}
