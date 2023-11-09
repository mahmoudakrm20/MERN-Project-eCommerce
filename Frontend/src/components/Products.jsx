import React from 'react'
import './Products.css'
import axios from 'axios';
import banner5 from '../Shopwise/Banner55.jpg'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function Products({addToCart}) {
  const [products, setProducts] = useState([]);
  function getProducts () {
    axios
    .get("http://localhost:4000/products")
    .then((response) => {
      console.log(response)
      setProducts(response.data.products.slice(4));
    })
  }
  useEffect(()=> {
    getProducts()
  },[])
  return (
    <>
    <div className='Products1'>
        <h1>Products</h1>
        
    </div>
    <div className='productscontainer'>
      <div className='productflex'>
      {products.map((product1) => (
        <div className='productscol'>
          <div className='columnadjust' key={product1.id}>
            <div className='productsimgdiv'> 
          <img className='productsimg' src={product1.img} alt={product1.title} />
          </div> 
          <div className='Titlesprodcuts'>
          <Link to={`/singleproduct/${product1.id}`}>
            <h3>{product1.title}</h3>
            </Link>
          <h4>Price: $ {product1.price}</h4>
          {/* <p>Category: {product1.category}</p> */}
          {/* <p>Description: {product.description}</p> */}
          </div>
          <button className='buttonaddtocart' onClick={() => addToCart(product1)}>Add to Cart</button>
        </div>
        </div>
      ))}
      </div>
    </div>

    <div className='bannerdiv2'>
        <div className='cardcss2'>
            <p>Sale Get up to 50% Off</p>
            <h1 className='smrcollection'>Best furniture Collection</h1>
            <button>SHOP NOW</button>
        </div>
    <div className='bannercss'>
     <img className='bannerjpg' src={banner5}alt='banner'/>
     </div>  
    </div>
    </>
  )
}
