import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import basket from '../../store/Basket';
import { observer } from 'mobx-react-lite';
import style from './ShoppingCartPage.module.css';
import FirstOrder from '../HomePage/FirstOrder/FirstOrder';

import xModal from '../../icon/xModal.png'
import iconX from '../../icon/ic x.png';
import axios from 'axios';
// import OrderForm from '..OrderForm/OrderForm'


const ShoppingCartPage = observer(() => {

  const [isModalOpen, setIsModalOpen] = useState(false);

   


   const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isValid },
    } = useForm( {mode: 'onChange'} );
  
    const onSubmit = async (data) => {
      
      setIsModalOpen(true);
      
      try {
        const postForm = await axios.post('http://localhost:3333/order/send', data);

        console.log('Server answer: ', postForm.data, data);

        
        
        
        

        openModal();

        if (isModalOpen) {
          basket.clearBasket();
        }

        reset();
        
         

      } catch (error) {
        console.log('Error: ', error)
        
      }
      
    }

    
    const openModal = () => {
      console.log('Modal opening...');
      setIsModalOpen(true); }

    const closeModal = () => {
      basket.clearBasket();
      setIsModalOpen(false);}


  const handleIncrease = (id) => {
    basket.increaseItemCount(id); 
  };

  const handleDecrease = (id) => {
    basket.decreaseItemCount(id); 
  };

  const handleRemove = (id) => {
    basket.removeItem(id); 
  };
  
  const groupedItemsMap = new Map();
  
  basket.items.forEach((item) => {
    if (item && item.id) {
      if (groupedItemsMap.has(item.id)) {
        groupedItemsMap.get(item.id).count += 1;
      } else {
        groupedItemsMap.set(item.id, { ...item, count: 1 });
      }
    }
  });

  const itemsArray = Array.from(groupedItemsMap.values());

  const totalPrice = itemsArray.reduce(
    (sum, el) => sum + (el.discont_price ? el.discont_price : el.price ? el.price : 0) * el.count,
    0
  );

  console.log('isModalOpen:', isModalOpen)

  return (

    
    <>{
      itemsArray.length === 0 ? ( 
      
      <><h1 className={style.looks_like}>Looks like you don't have items in your cart</h1>

      <Link to='/'>
      <button className={style.button_continue_shopping}>Continue shopping </button>
      </Link>
      
      </>  ) :null
       
    }

{itemsArray.length > 0 &&  (
  
    <div className={style.container_cart}>
      
        
          <div className={style.sale_header}>
            <h1 className={style.sale_title}>Shopping cart</h1> 
            <div className={style.line}></div>
            <Link to='/'><button className={style.back_button}>Back to the store</button></Link> 
          </div>   
 
          <div className={style.cart_view}>

          <div className={style.basket_items}>
            
            {itemsArray.map((item) => (
              <div key={item.id} className={style.basket_item}>
                <div className={style.image_container}>
                  <img
                    src={`http://localhost:3333/${item.image}`}
                    alt={item.title}
                    className={style.sale_image}
                  />
                </div>

                

                 
                 {/* <img src={iconX} alt="iconx" className={style.remove_button} onClick={() => basket.removeItem(item.id)}/> */}
                 {/* <h3 className={style.sale_item_title}>{item.title}</h3> */}
                 
                 
                 


                
                
                


<div className={style.main_controls_and_price}> 

<img src={iconX} alt="iconx" className={style.remove_button} onClick={() => basket.removeItem(item.id)}/>
<h3 className={style.sale_item_title}>{item.title}</h3>











<div className={style.controls_and_price}>

                  

<div className={style.quantity_controls}>
  <button className={style.clicker_button} onClick={() => handleDecrease(item.id)}>
    -
  </button>
  <span className={style.count_number}>{item.count}</span>
  <button className={style.clicker_button} onClick={() => handleIncrease(item.id)}>
    +
  </button>
</div>

<div className={style.product_price}>
  {item.discont_price ?(
    <>
    <span className={style.new_price}>
       ${item.discont_price.toFixed(2)}
    </span>
    <span className={style.old_price}>${item.price.toFixed(2)}</span>
    </>):
  <span className={style.new_price}>${item.price.toFixed(2)}</span>}
</div>

</div>



</div>


                


                
                
              </div>
            ))}
          </div>

            <div className={style.total}>
              <h1 className={style.total_title}>Order details</h1>
            <h2 className={style.total_items}>
              <p>{basket.items.length} items</p>
            </h2>

            <h2 className={style.total_price}>
              <p>Total <span className={style.price_value}>${totalPrice.toFixed(2)}</span> </p>
            </h2>

            <div className={style.order_block}>


                  
{isModalOpen && (
console.log('rendering modal', isModalOpen),

  
  <div className={style.modalOverlay}>
     <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
      
       <img src={xModal} alt="" onClick={closeModal} className={style.close_modal}/>
       <h2 className={style.h_conratulations}>Congratulations!</h2>
       <p className={style.p_conratulations}>Your order has been successfully placed on the website.</p>
       <p className={style.p_conratulations}>A manager will contact you shortly to confirm your order.</p>
        
      
        
     </div>
  </div>
)}

                  <form onSubmit={handleSubmit(onSubmit)}>
            
                      
                      <input  className={style.order_input} type="text" placeholder='Name' {...register('name', {
                          
                          
                          pattern: {
                              value: /^[A-Za-z]+$/,
                              message: 'The name cannot contain numbers and another symbols!'
                          }
                      })}/>
                      <div>
                       {errors.name && <p className='p-error'>{errors.name.message}</p>}
                      </div>
            
                      <input  className={style.order_input} type="number" placeholder='Phone number' {...register('phoneNumber', {
                            
                            minLength: {value: 10, message: 'The minimal number length is 10'},
                            maxLength: {value: 15, message: 'The maximal number length is 15'},
                            pattern: {
                              value: /^\+?[0-9]*$/,
                            }
                        })}/>
                        <div>
                         {errors.phoneNumber && <p className='p-error'>{errors.phoneNumber.message}</p>}
                        </div>
            
                       
                        <input  className={style.order_input} type="text" placeholder='Email' {...register('email', {
                            
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Email should be in the format: example@telran.com'
                            }
                        })}/>
                        <div>
                        {errors.email && <p className='p-error'>{errors.email.message}</p>}
                        </div>
                        <button disabled={!isValid || itemsArray.length === 0} type='submit' className={style.order_button}>Order</button>
                    </form>
                    
                    
                </div>


            </div>
          
            
            
          </div>
            
          
          
        </div>
 )}   




      <div className={style.order_form}>
{/* <OrderForm></OrderForm> */}
</div>

    </>
  );
});

export default ShoppingCartPage;