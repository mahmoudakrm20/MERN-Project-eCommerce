import React, { useState, useEffect } from 'react';
import './Register.css'
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    axios.post('http://localhost:4000/signup', data)
      .then((response) => {
        navigate('/login')
      }).catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred.');
        }
      })
  };

const [cartItems, setCartItems] = useState([]);
const token = localStorage.getItem('token');
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
    {token ? (
    <div className='logincontainer'>
    <div className='LoginInsideContainer'>
    <h1 className='loggedinalready'>You are already logged in</h1>
    </div>
    </div>)
    :(
    <div className='logincontainer'>
    <div className='LoginInsideContainer'>
    <h1>Register</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <h3>Username</h3><br></br>
        <input className='usernameinput' {...register('username')} type="username" />
      </label>
      <br />
      <label>
      <h3>Password</h3> <br></br>
        <input className='usernameinput' {...register('password')} type="password" />
      </label><br></br>
      <br />
      <span style={{ color: 'red' , fontSize: '17px' ,fontWeight: 500}}>{errorMessage && <p>{errorMessage}</p>}</span>
      <br></br>
      <Link to ='/login'><span className='remembertext'> Already have an account ? </span></Link>
      <button className='submitinput' type="submit">Register</button>
    </form>
    </div>
    </div>)}
      <Footer />
    
    </div>}
    
    </>
  );
}

