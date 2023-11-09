import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Card from './Card';
import Products from './Products';
import Footer from './Footer';
import ClipLoader from "react-spinners/ClipLoader";
export default function Parent() {

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
  setTimeout(() => {
  setLoading(false)
  },1000)
  }, [])



  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <>
    {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><ClipLoader color={'#D0021B'} loading={loading} size={100} /> </div> :
  
  <div>
      <Nav cart={cart} removeFromCart={removeFromCart} />
      <Card addToCart={addToCart} />
      <Products addToCart={addToCart} />
      <Footer />
      </div>}
    </>
  );
}
