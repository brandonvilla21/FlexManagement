import { ProductPurchaseProductInterface } from './product-purchase-product.model';

export interface PurchaseProductInterface {
    purchase_id: string,
    provider_id: string,
    purchase_date: Date,
    subtotal: number,
    discount: number,
    total: number,
    product_purchaseProduct: ProductPurchaseProductInterface[];
}
