import React from 'react'
import { useState } from 'react';
import './Nav.css'
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logopng from '../Shopwise/logo-4.png'
import searchpng from '../Shopwise/Search.png'
import cartpng from '../Shopwise/cart.png'
import cartpng2 from '../Shopwise/cart2.png'
import userpng from '../Shopwise/user.png'
import menu from '../Shopwise/menu.png'
export default function Nav({ cart , removeFromCart}) {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  const toggleCartDropdown = () => {
    setShowCartDropdown(!showCartDropdown);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.reload();
  };
  
  return (
    <>
    <div className="navbarcss">
      <div className='navleftcss'>
      <Link to ='/'><img src={logopng} alt="Logo" /> </Link>
        </div>
        <div className='navmidcss'>
          
      <div className="dropdowncss">
        <button className="dropbtncss">HOME <span style={{color:'gray'}}>˅</span>
          </button>
   <div className="dropdowncontentcss">
        <a href="#/">Furniture 1</a>
        <a href="#/">Furniture 2</a>
        <a href="#/">Furniture 3</a>
        <a href="#/">Furniture 4</a>
      </div>
      </div> 
      <div className="dropdowncss">
        <button className="dropbtncss">PRODUCTS <span style={{color:'gray'}}>˅</span>
          </button>
   <div className="dropdowncontentcss">
        <a href="#/">Living Room</a>
        <a href="#/">Bedroom</a>
        <a href="#/">Dining room</a>
        <a href="#/">Kitchen</a>
      </div>
      </div> 
        <a className='productonavo' href="#/">OFFERS<span style={{color:'gray'}}></span></a>
        <a className='blogonafo' href="#/">NEW</a>
        <a className='shoponavo' href="#/">ABOUT</a>
        {userName==='admin' ? (
          <a className='contactouso' style={{color:'blue'}} href="/addproducts">ADD PRODUCT</a>
        ):
        (
          <a className='contactouso' href="/">Contact us</a>
        )}
        </div>
      <div className='navrightcss'>

        <img className='searchpng' src={searchpng} alt="Logo" />
        
        {cart.length === 0 ? (
  <img className='cartpng' src={cartpng} alt='Logo' onClick={toggleCartDropdown} />
) : (
  <img className='cartpng' src={cartpng2} alt='Logo' onClick={toggleCartDropdown} />
)}
          {showCartDropdown && (
            <div className='dropdowncart'>
              <div className="cart-dropdown">
              {cart.map((item) => (
                 <div className='flexcart'>
                <div className='cartdropcss'>
                <div key={item.id}>
                  <div className='cartflexable'>
                  <div className='hamadacartimg'> <img className="cartimgcss" src={item.img} alt=""/></div>
                  <div className='cartcol'>
                  <h2>{item.title}</h2>
                  <h3>Quantity: {item.quantity}</h3>
                  <p>Price : {item.quantity} X {item.price} = {item.quantity*item.price}$</p>
                  </div>
                  </div>
                </div>
                </div>
                <div><button onClick={() => removeFromCart(item.id)} className='xbuttoncart'>x</button></div>
                </div>
                
              ))}
              {cart.length > 0 && (
              <div className='divcheckout'>
              <Link to='/Cart'><button className='Checkoutbtn'>Proceed To Checkout</button></Link>
              </div>
                )}
                {cart.length === 0 && (
              <div className='divcheckout'>
              <Link to='/Cart'><h3>Cart is empty</h3></Link>
              </div>
                )}
              </div>
              </div>
          )}
        <img className='userpng'src={userpng} alt="User"/>
        <img className='menupng'src={menu} alt="User"/>
        {token ? (
      <div className="dropdowncss">
        <button className="dropbtncss accountodetailso">Account <span style={{color:'gray'}}>˅</span></button>
        <div className="dropdowncontentcss">
          {userName==='admin'?(
            <a style={{color:'blue'}} href="/addproducts">Products</a>
          ):(
            <a href="/">Contact us</a> 
          )}
          <a href="#/">Settings</a>
          <a href="#/">Privacy</a>
          <a href="#/">Security</a>
          <a href="#/" onClick={handleLogout}>Log out</a>
        </div>
      </div>
    ) : (
      <Link to="/Login"><a href="#/Login" className="loginbutton">Login</a></Link>
    )}
        </div>
    </div>
  </>  
  )
}
