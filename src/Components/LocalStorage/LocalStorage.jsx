import React, { useState, useEffect } from 'react';

const LocalStorageArrayComponent = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('myArray');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('myArray', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    const newItem = prompt('Введите новый элемент:');
    if (newItem) {
      setItems((prevItems) => [...prevItems, newItem]);
  }
  };

  const handleClear = () => {
    setItems([]);
    localStorage.removeItem('myArray');
  };

  return (
    <div>
      <h1>LocalStorage Array Example</h1>
      <button onClick={handleAddItem}>Добавить элемент</button>
      <button onClick={handleClear}>Очистить</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocalStorageArrayComponent;
