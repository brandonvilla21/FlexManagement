import { ProductSaleProductInterface } from './product-sale-product.model';

export interface SaleProductInterface {
  sale_id: string,
  customer_id: string,
  employee_id: string,
  sale_date: Date,
  type: string,
  state: string,
  subtotal: number,
  discount: number,
  total: number,
  total_payment: number,
  product_saleProduct: ProductSaleProductInterface[];
}
