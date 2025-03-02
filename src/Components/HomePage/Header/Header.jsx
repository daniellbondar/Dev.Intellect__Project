import React, { useState } from "react";
import {slide as Menu} from 'react-burger-menu';
import "../Header/Header.css";
import logo from "../../../logo/logo.png";
import basketIcon from "../../../icon/icons.png";
import menu from '../Header/menu.png'
import { Link } from "react-router-dom";
import basket from "../../../store/Basket";
import { observer } from "mobx-react-lite";

function Header() {
const [menuOpen, setMenuOpen] = useState(false);

const handleStateChange = (state) => {
  setMenuOpen(state.isOpen);
};

const closeMenu = () => {
  setMenuOpen(false);
};

  return (
    <header className="header">
      
      <Link to='/' className="logo">
      <img src={logo} alt="Logo" />
      </Link>
      
      <img src={menu} alt="menu-icon" onClick={() => setMenuOpen(!menuOpen)} className="menu-icon"/>
      
       <Menu isOpen={menuOpen}
             onStateChange={handleStateChange}
             className="burger-menu" 
             customBurgerIcon={false} 
              right>
          <Link to='/' className="link" onClick={closeMenu}>Main Page</Link>
          <Link to='/category' className="link" onClick={closeMenu}>Categories</Link>
          <Link to='/allproducts' className="link" onClick={closeMenu}>All products</Link>
          <Link to='/allsales' className="link" onClick={closeMenu}>All sales</Link>
       </Menu>

        <ul className="navigation">
          <Link to='/' className="link">Main Page</Link>
          <Link to='/category' className="link">Categories</Link>
          <Link to='/allproducts' className="link">All products</Link>
          <Link to='/allsales' className="link">All sales</Link>
        </ul>

        
            <Link to='/shippingcart' className="basket-icon">

            
            <span className="basket-products-count">{basket.items.length}</span>
            <img src={basketIcon} alt="Basket Icon" />
            
            
            </Link>
      
      
    </header>
  );
}

export default observer(Header);