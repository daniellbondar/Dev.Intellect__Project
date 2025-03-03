import React from 'react';
import { useState, useEffect } from 'react';
// import basket from '../../store/Basket';
import basket from '../../store/Basket';
import './AddToBasket.css';

function AddToBasket({ value, counter }) {
  // console.log('AddtoBasket item',value)
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('myArray');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Эффект для сохранения массива в localStorage при его изменении
  const onClickHandler = (value) => {
    let multiply = counter ? counter : 1

    while (multiply > 0) {
      multiply -= 1;
      basket.addItem(value);

      localStorage.setItem('myArray', JSON.stringify(basket));
      const savedItems = localStorage.getItem('myArray');
      const localBasket = savedItems ? JSON.parse(savedItems) : [];
      console.log('localBasket', localBasket);
    }
  };

  // console.log('items',items)

  return (
    <div>
      <button
        className="add-button"
        onClick={() => onClickHandler(value)}
      >
        AddToCart
      </button>
    </div>
  );
}

export default AddToBasket;
