import React, { useState, useEffect } from 'react';
import './Addproducts.css'
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from 'react-hook-form';
import Nav from '../components/Nav';
export default function Register() {


  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
  setTimeout(() => {
  setLoading(false)
  },1000)
  }, [])


  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post('http://localhost:4000/products/add', data)
      .then((response) => {
        navigate('/')
      }).catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred.');
        }
      })
  };
const [cartItems, setCartItems] = useState([]);
const userName = localStorage.getItem('userName');
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
    {userName === 'admin' ? 
    (
    <div className='logincontainer'>
    <div className='LoginInsideContaineradd'>
    <h1>Add a Product</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <br></br>
      <h3>Title</h3>
      <label>
        <input className='usernameinputadd' {...register('title')} />
      </label>
      <h3>Price</h3>
      <label>
        <input className='usernameinputadd' {...register('price')}  />
        </label>
        <h3>IMG Link</h3>
        <label>
        <input className='usernameinputadd' {...register('img')}  />
        </label>
        <h3>ID</h3>
        <label>
        <input className='usernameinputadd' {...register('id')}  />
      </label><br></br>
      <br />
      <span style={{ color: 'red' , fontSize: '17px' ,fontWeight: 500}}>{errorMessage && <p>{errorMessage}</p>}</span>
      <br></br>
      <button className='submitinputadd' type="submit">ADD</button>
    </form>
    </div>
    </div>):
    (
      <div className='logincontainer'>
      <div className='LoginInsideContaineradd'>
      <h1 className='loggedinalready'>You are not an admin</h1>
      </div>
      </div>)}
      <Footer />
      </div>}
    </>
  );
}

