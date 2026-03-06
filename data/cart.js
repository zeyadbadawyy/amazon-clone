//import { updateCartQuantity } from "../scripts/amazon";

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart)
{
  cart=[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:299
  },
  {
    productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity: 90
  }];
}

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
      cart.push({productId : productId,quantity:1});
    }
    //updateCartQuantity();
    saveToStorage();
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
  //updateCartQuantity();
  saveToStorage();
}