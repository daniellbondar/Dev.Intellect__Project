import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { useParams } from "react-router-dom";

class SelectedCategory {

  

  category = {};

  

  constructor() {
    makeAutoObservable(this)
    const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    this.category = JSON.parse(savedCategory);
  }
  }

  get plainCategory() {
    return toJS(this.category);
  }
  
  addItem(item) {
    this.category = item;
    localStorage.setItem('selectedCategory', JSON.stringify(item));
  }

  getItem() {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory ? JSON.parse(savedCategory) : null;
   }



  fetchCategories = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3333/categories/${id}`);
      console.log('resp data', response.data);
      
    runInAction(() => {
      this.category = response.data.category;
      console.log('caetegory', this.category);
      
    });
    } catch (error) {
      console.log('Category loading failed');
      
    }
    

};
}

const selectedCategory = new SelectedCategory();
export default selectedCategory;