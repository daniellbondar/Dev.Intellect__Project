import React from 'react';
// import basket from '../../store/Basket';
import basket from '../../store/Basket';
import './AddToBasket.css'


const AddToBasket =({value}) =>{

  
  console.log('AddtoBasket item',value)
  return (
   
      <button className="add-button" id ="add-button" onClick={() => basket.addItem(value)}>Add to cart</button>
    
  );
}

export default AddToBasket;
