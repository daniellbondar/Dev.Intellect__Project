import { makeAutoObservable } from "mobx";

class CartState () {
  cartItem = []

  constructor( {
    makeAutoObservable(this)
  })

   addItem(card) {
    this.cartItem.push(card)
   }

   removeItem(cardId) {
    this.cartItem = this.cartItem.filter((card)=> card.id !== cardId)
   }

   getTotalPrice() {
    // ?? return this.cartItem.reduce((total,item)=> total + item.price,0)
    // на уроке 
    return this.cartItem.reduce((total,item)=> total + item,0)
}