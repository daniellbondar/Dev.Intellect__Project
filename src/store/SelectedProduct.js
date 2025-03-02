import { makeAutoObservable } from "mobx";

class SelectedProduct {

  selectedProduct = {};

  constructor() {
    makeAutoObservable(this);
  }

  addItem(item) {
    this.selectedProduct = item;
    localStorage.setItem('selectedProduct', JSON.stringify(item));
  }

  getItem() {
    const savedItems = localStorage.getItem('selectedProduct');
    return JSON.parse(savedItems)
  
  }

}

const selectedproduct = new SelectedProduct();
export default selectedproduct;