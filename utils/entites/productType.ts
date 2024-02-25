// this interface is only to reperesnt the updatable attributes of Type Product
export interface ProductType {
    categoryId: string,
    categoryName: string
    name: string,
    quantity: number,
    cost: number,
    price: number,
    image?: string,
    saledTimes: bigint,
    viewedTimes: bigint,
}