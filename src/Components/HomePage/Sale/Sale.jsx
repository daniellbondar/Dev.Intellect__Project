import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import "./Sale.css";
import styles from './Sale.module.css';
import { Link } from 'react-router-dom';
import Items from '../../Items/Items';

export const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Sale = () => {
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:3333/products/all');
        const filteredSales = shuffle(
          response.data.filter((el) => el.discont_price !== null)
        );
        setSale(filteredSales);
      } catch (err) {
        setError('Ошибка при загрузке sale');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  return (
    <section className={styles.sale}>
      <div className={styles.sale__container}>
        <div className={styles.sale__header}>
          <h2 className={styles.title}>Sale</h2>
          <div className={styles.line}></div>
          <Link to="/allsales">
            <button className={styles.all_sales_btn}>All sales</button>
          </Link>
        </div>
        <div className={styles.sale__items}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            sale
              .slice(0, 4)
              .map((item) => (
                <Items
                  item={item}
                  key={item.id}
                  title={item.title}
                  img={`http://localhost:3333/${item.image}`}
                  newPrice={item.discont_price}
                  oldPrice={item.price}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Sale;

