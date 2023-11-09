import React, { useEffect, useState } from 'react';
import './SingleProduct.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import ClipLoader from "react-spinners/ClipLoader";
export default function SingleProduct() {

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
  setTimeout(() => {
  setLoading(false)
  },1000)
  }, [])

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${id}`)
      .then((response) => {
      setProduct(response.data.product);
      })
  }, [id]);
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

  const deleteProduct = () => {
    axios
      .delete(`http://localhost:4000/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // Product deleted successfully
          navigate('/'); // Redirect to the homepage 
        } else {
          // Handle deletion failure
          console.error('Failed to delete the product');
        }
      })
      .catch((error) => {
        console.error('Error deleting the product', error);
      });
  };

  return (<>
    {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><ClipLoader color={'#D0021B'} loading={loading} size={100} /> </div> :
  
    <div>
        
        <Nav cart={cartItems} removeFromCart={removeFromCart} />

      {product ? (
        <div className='singleprodcon'>
            <div className='singleprodcon2'>
            <div className='SingleProdImg1'>
            <img src={product.img} alt=""/></div>
            <div className='singleprodcol'>
          <h1>{product.title}</h1>
          <h2> ${product.price}</h2>
          <h3> {product.category}</h3>
          <h5> {product.description}</h5>
          <Link to='/'><button onClick={()=>(localStorage.removeItem('cart'))} className='singlebtnprod'>Buy Product</button></Link>
          <button onClick={deleteProduct} className='singlebtnprod2'>Delete Product</button>
          </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Footer/>
    </div>}
    </>);
}
