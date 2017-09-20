import { ProductSaleProductInterface } from './product-sale-product.model';

export interface SaleProductInterface {
    sale_id: string,
    provider_id: string,
    sale_date: Date,
    subtotal: number,
    discount: number,
    total: number,
    product_saleProduct: ProductSaleProductInterface[];
}
