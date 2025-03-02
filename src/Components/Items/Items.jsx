import React from 'react';
// import "./Items.css";
import styles from './Items.module.css';
import AddToBasket from '../Buttons/AddToBasket';
import selectedproduct from '../../store/SelectedProduct';
import ShowDetails from '../Buttons/ShowDetails';
import { Link } from 'react-router-dom';

const Items = (props) => {
  const { item } = props;
  const discount = Math.round(
    ((item.price - item.discont_price) / item.price) * 100
  );
  return (
    <div className={styles.item}>
      {item.discont_price && (
        <div className={styles.discount}>-{discount}%</div>
      )}

      <div className={styles.item__img_container}>
      <Link to={`/products/${item.id}`}>
        <img
          
          src={`http://localhost:3333/${item.image}`}
          alt="ProdPic"
          onClick={() => selectedproduct.addItem(item)}
          className={styles.item__img}
        />
      </Link>
      </div>
      
      <div className={styles.item__body}>
        {/* <AddToBasket value={item} /> */}

        <div className={styles.item__title}>{item.title}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {item.discont_price ? (
            <>
              <div className={styles.new__price}>${item.discont_price}</div>
              <div className={styles.old__price}>${item.price}</div>
            </>
          ) : (
            <div className={styles.new__price}>${item.price}</div>
          )}
        </div>
        {/* <ShowDetails value={item} /> */}
      </div>
    </div>
  );
};

export default Items;
