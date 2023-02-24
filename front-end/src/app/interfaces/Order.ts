export interface Order {
    _id: string,
    user: string,
    products: [{
        productId: string,
        quantity: number
    }],
    amount: number,
    address: string,
    status: string,
    createdAt: string,
    username: string,
    productsTitle: string[]
}
