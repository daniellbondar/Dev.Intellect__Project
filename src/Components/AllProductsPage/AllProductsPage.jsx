import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import selectedproduct from "../../store/SelectedProduct";
import style from './AllProductsPage.module.css'

export const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [discounted, setDiscounted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:3333/products/all");
        let filteredProducts = response.data;

        if (minPrice)
          filteredProducts = filteredProducts.filter(
            (p) => p.price >= Number(minPrice)
          );
        if (maxPrice)
          filteredProducts = filteredProducts.filter(
            (p) => p.price <= Number(maxPrice)
          );
        if (discounted)
          filteredProducts = filteredProducts.filter(
            (p) => p.discont_price > 0
          );

        if (sortField === "price_asc") {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortField === "price_desc") {
          filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortField === "discount_desc") {
          filteredProducts.sort(
            (a, b) => (b.discount || 0) - (a.discount || 0)
          );
        }

        setProducts(filteredProducts);
      } catch (err) {
        setError("Ошибка при загрузке товаров");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortField, minPrice, maxPrice, discounted]);

  return (
    <>
          <div className={style.all_products_content}>
              
              <div className={style.nav_buttons_all_products}>
                        <Link to='/'><button className={style.mainPage_nav}>Main page</button></Link>
                        {/* <div className='line-between'></div> */}
                        <button className={style.nav_all_products}>All products</button>
                        
              </div>
    
              <h1 className={style.all_products_h}>All products</h1> 
              
    
            {/* Фильтры */}
            <div className={style.filters}>
              <div>
                <label className={style.label}>Price</label>
                <input
                  type="number"
                  placeholder="from"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="to"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <label className={style.checkbox_label}>
              
              Discounted items
              <input
                type="checkbox"
                checked={discounted}
                onChange={(e) => setDiscounted(e.target.checked)}
              />
            </label>
    
              <div className="sort-container-discounted-page">
                <label className={style.label_sorted} htmlFor="sort-select">
                  Sorted
                </label>
                <select
                  id="sort-select"
                  className="sorted"
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                >
                  <option value="default">by default</option>
                  <option value="price_asc">Price ascending</option>
                  <option value="price_desc">Price descending</option>
                  <option value="discount_desc">Biggest discount</option>
                </select>
              </div>
            </div>
    
            <div className={style.sale_items}>
                        {products.map((item) => (              
                          <div key={item.id} className={style.sale_item}>
                            
                            
                            {item ? (
                              <>
                                <div className={style.image_container}>
                                  <Link to={`/products/${item.id}`} >
                                    <img
                                      src={`http://localhost:3333${item.image}`}
                                      alt={item.title}
                                      className={style.sale_image}
                                      
                                    />
                                  </Link>
                                 
                                  {item.discont_price && (
                        <div className={style.discount_badge}>
                          -{Math.round(100 - (item.discont_price / item.price) * 100)}%
                        </div>
                      )}
                    </div>
    
                      <h3 className={style.sale_item_title}>{item.title}</h3>
                      <>
                      <span className={style.new_price}>
                          $
                          {item.discont_price
                            ? item.discont_price.toFixed(2)
                            : item.price.toFixed(2)}
                        </span>
                        {item.discont_price && (
                          <span className={style.old_price}>
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </>
                    </>
                  ) : (
                    <div className="empty-sale-item"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      );
    };

export default AllProductsPage;
