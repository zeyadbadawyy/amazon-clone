import {cart,removeFromCart,updateCartQuantity,updateDeliveryOption} from '../../data/cart.js';
import{products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

export function renderPaymentSummary(){
  let itemsNo=0;
  let ProductsPrice=0;
  let shippingPrice=0;
  let TaxPrice=0;
  let OrderTotal=0;

  
}