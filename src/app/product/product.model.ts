export interface Product {
    description: string,
    brand: string,
    flavor: string,
    expiration_date: string,
    sale_price: number,
    buy_price: number,
    existence: number,
    max: number,
    min: number,
    product_id?: string,
    purchaseExistence?: number,
    saleExistence?: number
}
