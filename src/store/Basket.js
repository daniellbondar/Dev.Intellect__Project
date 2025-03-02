import { makeAutoObservable } from "mobx";

class Basket {
  items = [];

  constructor() {
    makeAutoObservable(this);
    this.items = this.getBasket() ? this.getBasket() :[] ;
    
  }

  addItem(item) {
    this.items.push({ ...item });
    localStorage.setItem('Basket', JSON.stringify(this.items));
  }
  setItem(newItems) {
    this.items = newItems;
    localStorage.setItem('Basket', JSON.stringify(this.items));
  }
  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
    localStorage.setItem('Basket', JSON.stringify(this.items));
  }

  increaseItemCount(id) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      this.items.push({ ...item }); // Добавляем ещё один экземпляр
      localStorage.setItem('Basket', JSON.stringify(this.items));
    }
  }

  decreaseItemCount(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1); // Удаляем один экземпляр
    }
    localStorage.setItem('Basket', JSON.stringify(this.items));
  }

  clearBasket() {
    this.items = [];
    localStorage.setItem('Basket', JSON.stringify([]));
  }

  getBasket() {
    const savedItems = localStorage.getItem('Basket');
    return JSON.parse(savedItems);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }
}

const basket = new Basket();
export default basket;