import {cart,removeFromCart,cartQuantity,updateDeliveryOption} from '../../data/cart.js';
import{getProduct, products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary(){
  let itemsNo=0;
  let productsPrice=0;
  let shippingPrice=0;
  let beforeTaxTotal=0;
  let taxPrice=0;
  let orderTotal=0;

  itemsNo=cartQuantity;

  cart.forEach((cartItem)=>{
    const product=getProduct(cartItem.productId);
    productsPrice+=(product.priceCents)*cartItem.quantity;
})

  cart.forEach((cartItem)=>{
  const deliveryOptionId=cartItem.deliveryOptionId;
  deliveryOptions.forEach((option)=>{
  if(deliveryOptionId === option.id)
  {
    if(option.priceCents!==0)
    {
      shippingPrice+=option.priceCents;
    }
  }
  })
})
  beforeTaxTotal=productsPrice+shippingPrice;

  taxPrice=0.1*beforeTaxTotal;
  orderTotal=taxPrice+beforeTaxTotal;

  productsPrice = formatCurrency(productsPrice);
  shippingPrice = formatCurrency(shippingPrice);
  beforeTaxTotal = formatCurrency(beforeTaxTotal);
  taxPrice = formatCurrency(taxPrice);
  orderTotal = formatCurrency(orderTotal);

  const paymentSummaryHTML=`
            <div class="payment-summary js-payment-summary">
              <div class="payment-summary-title">
                Order Summary
              </div>

              <div class="payment-summary-row">
                <div>Items (${itemsNo}):</div>
                <div class="payment-summary-money">$${productsPrice}</div>
              </div>

              <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${shippingPrice}</div>
              </div>

              <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${beforeTaxTotal}</div>
              </div>

              <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${taxPrice}</div>
              </div>

              <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${orderTotal}</div>
              </div>
              <button class="place-order-button button-primary js-place-order">
                Place your order
             </button>
  `
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener('click',async ()=>{
    try{
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({cart:cart})
      })
      const order=await response.json();
      addOrder(order);
    } 
    catch(error)
    {
      console.log('Error broooooo');
    }

    window.location.href= 'orders.html'
  })
}