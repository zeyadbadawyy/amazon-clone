//import { updateCartQuantity } from "../scripts/amazon";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];
/*if(cart.length===0)
{
  cart=[{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:299,
    deliveryOptionId:'1'
  },
  {
    productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity: 90,
    deliveryOptionId:'2'
  }];
}*/

export let cartQuantity = 0;

updateCartQuantity(); // run when the script loads

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId)
    {
      matchingItem=cartItem;
    }});

    if(matchingItem)
    {
      matchingItem.quantity++;
    }
    else{
      cart.push({productId : productId,quantity:1, deliveryOptionId:'1'});
    }
    saveToStorage();
    updateCartQuantity();
}

export function removeFromCart(productId)
{
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(productId!==cartItem.productId)
    {
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStorage();
  updateCartQuantity();
}

export function updateCartQuantity(){
  cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });
  console.log(cartQuantity)
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId)
    {
      matchingItem=cartItem;
    }});

  matchingItem.deliveryOptionId=deliveryOptionId;
  saveToStorage();
}