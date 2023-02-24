export interface Product {
    _id: string,
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    seller: string,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: [string]
}