import React, { useState, useEffect } from 'react';
import './Cart.css';
import './Products.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import ClipLoader from "react-spinners/ClipLoader";
export default function Cart() {

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
  setTimeout(() => {
  setLoading(false)
  },1000)
  }, [])


  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  return (
    <>
    {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><ClipLoader color={'#D0021B'} loading={loading} size={100} /> </div> :
    <div>
      <Nav cart={cartItems} removeFromCart={removeFromCart} />
      <h1 className="shoppingcarto"> Shopping Cart</h1>
      <div className="cartpageflex">
        <div className="cartpageflex2">
          {cartItems.map((cartItem) => (
            <div className="" key={cartItem.id}>
            <div className="rowcolcarto">
              <div className="cartoimg">
              <img className="" src={cartItem.img} alt={cartItem.title} />
            </div>
            <div className="cartodetails">
            <h2>{cartItem.title}</h2>
            <h3>Quantity: {cartItem.quantity}</h3>
              <p>
             Price: {cartItem.quantity} X {cartItem.price} = {cartItem.quantity * cartItem.price}$
            </p>
           </div>
          </div>
           <hr />
       </div>
          ))}
        </div>
        <Link to="/">
          <button onClick={() => localStorage.removeItem('cart')} className="cartobuttono">
            Proceed to buy
          </button>
        </Link>
      </div>
      <Footer />
      </div>}
    </>
  );
}
