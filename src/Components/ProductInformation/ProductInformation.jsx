import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductInformation.css';
import selectedCategory from '../../store/SelectedCategory';
import selectedproduct from '../../store/SelectedProduct';
import AddToBasket from '../Buttons/AddToBasket';
import basket from '../../store/Basket';
import { observer } from 'mobx-react-lite';

export const ProductInformation = observer(() => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  

  console.log('CategoryProductsPage');
  useEffect(() => {

    


    const fetchProducts = async () => {
      const prodInLocalStorage = selectedproduct.getItem();

      if (!prodInLocalStorage) {
        setError('Продукт не знайдено в локальному сховищі');
        setLoading(false);
        return;
      }

      try {
        console.log('selectedproduct', selectedproduct);
        const response = await axios.get(
          `http://localhost:3333/products/${id}`
        );
        console.log('отримані дані', response.data);

        if (response.data && typeof response.data === 'object') {
          setProduct(response.data);
        } else {
          setError('Продукт не знайдено');
        }

        if (Array.isArray(response.data) && response.data.length > 0) {
          setProduct(response.data[0]);
        } else {
          setError('Продукт не знайдено');
        }

      } catch (err) {
        setError('Ошибка при загрузке products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); 
  }, [id]);

  // useEffect(() => {
  //   selectedCategory.fetchCategories(id).then(() => {
  //     console.log('Updated selectedCategory:', selectedCategory);
  //   });
  // }, [id]);

  
loading && <h1>Loading</h1>

const handleBack = () => {
  navigate(-1);
}

  
if (loading) return <h1>Loading...</h1>;
if (error) return <h1>{error}</h1>;
if (!product || Object.keys(product).length === 0) return <h1>Продукт не знайдено</h1>;


const toggleText = () => setIsExpanded(!isExpanded);
  return (
    <>
      
      <div className="product-information-main-container">
  
          
          
      <div className='product-information-nav-buttons'>
          <Link to='/'><button className='mainPage-nav'>Main page</button></Link>
          <Link to='/category'><button className='categories-nav-product-information'>Categories</button></Link>
          <button className='category-title-button' onClick={handleBack}>{selectedCategory.category?.title}</button>
          <button className='product-title-button'>{product.title}</button>
      </div>
          

            
          

<div className="product-infomation-item">
                          
        <div className="product-infomation-image-container">
                      <img
                        src={`http://localhost:3333/${product.image}`}
                        alt={product.title}
                        className="product-infomation-image"
                      />
                 
                      {/* <div className="discount-badge">
                      -{' '}
                      {Math.round(
                        100 - (item.discont_price / item.price) * 100
                      )}
                      %
                    </div> */}
        </div>

  <div className='product-infomation'>
  

                    <h3 className="product-infomation-item-title">{product.title}</h3>
                
      <div className='product-information-price'>

                {product.discont_price && (
          <span className="products-information-discount-badge">
              -{Math.round(100 - (product.discont_price / product.price) * 100)}%
          </span>
               )}

                {product.discont_price ? (
                    <>
                    <span className="products-information-new-price">{product.discont_price.toFixed(2)}</span>
                    <span className="products-information-old-price">{product.price.toFixed(2)}</span>
                   </>
               ) : (
                   <span className="price-products-information">${product.price.toFixed(2)}</span>
                  )}

                
            

      </div>

      <div className='counter-and-button'>

                  

<div className='counter'>
  <button className='counter-minus-button' onClick={() =>{
              counter === 1 ? setCounter(counter):
          setCounter(counter - 1)}}>
    -
  </button>

  <span className="count-number">{counter}</span>

  <button className='counter-button' onClick={() => setCounter(counter + 1)}>
    +
  </button>

  <AddToBasket value ={product} counter={counter}/>

  {/* <button onClick={handleAddToBasket}>Add to cart</button> */}
</div>

</div>
                    
      <div className='product-information-description'>
                <h4 className='h-description'>Description</h4>
                <p>
        {isExpanded ? product.description : product.description.substring(0, 250)}

        {product.description.length >= 250 && 
        <span 
          onClick={toggleText} 
          className={isExpanded ? 'read-less' : 'read-more'}>
          {isExpanded ? 'Close' : 'Read more'}
        </span>
        }
      </p>
      </div>
                  
                  
  </div>
                    
                  
                
                
</div>
            
          </div>
      
    </>
  );
});
