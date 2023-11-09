import React from 'react'
import './Card.css'
import bannerjpg from '../Shopwise/banner2.jpg'
import deliverypng from '../Shopwise/delivey.png'
import moneypng from '../Shopwise/money.png'
import paymentpng from '../Shopwise/payment.png'
import customerpng from '../Shopwise/customer.png'
import shopimg1 from '../Shopwise/shop_banner_img1.jpg'
import shopimg2 from '../Shopwise/shop_banner_img2.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function Card({addToCart}) {
  const [products, setProducts] = useState([]);
  function getProducts () {
    axios
    .get("http://localhost:4000/products")
    .then((response) => {
      console.log(response)
      setProducts(response.data.products.slice(0,4));
    })
  }
  useEffect(()=> {
    getProducts()
  },[])
  return (
    <>
    {/* banner  */}
    <div className='bannerdiv'>
        <div className='cardcss'>
            <p>Taking your Viewing Experience to Next Level</p>
            <h1>Sofa Collection</h1>
            <button>SHOP NOW</button>
        </div>
    <div className='bannercss'>
     <img className='bannerjpg' src={bannerjpg}alt='banner'/>
     </div>  
    </div>


    {/* Section */}
    <div>
      <div className='containercss'>
        <div className='rowcss'>
          <div>
          <img className="delivery"src={deliverypng} alt="delivery"/>
          </div>
          <div className='hamada'>
        <h1>Free Delivery</h1>
        <p>Worldwide</p>
           </div>
        </div>
        <div className='rowcss'>
          <div>
          <img className="delivery"src={moneypng} alt="delivery"/>
          </div>
          <div className='hamada'>
        <h1>Money Returns</h1>
        <p>30 Days money return</p>
           </div>
        </div>
        <div className='rowcss'>
          <div>
          <img className="delivery" src={customerpng} alt="delivery"/>
          </div>
          <div className='hamada'>
        <h1>27/4 Online Support</h1>
        <p>Customer Support</p>
           </div>
        </div>
        <div className='rowcss'>
          <div>
          <img className="delivery"src={paymentpng} alt="delivery"/>
          </div>
        <div className='hamada'>
        <h1>Payment Security</h1>
        <p>Safe Payment</p>
           </div>
        </div>
      </div>
    </div> 
    
    <div className='Products1'>
        <h1>Exclusive Products</h1> 
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

    <div className='container2cards'>
      <div className='containerinside'>
        <div className='firstcard'>
          <img src={shopimg1} alt="" />
          <div className='secondcarddetails'> 
          <h2>Super Sale</h2>
          <h1>New Collection</h1>
          <h3>Shop Now</h3>
        </div>
        </div>
        {/*  */}
        <div className='secondcard'>
        <img src={shopimg2} alt="" />
        <div className='secondcarddetails'> 
          <h1>New Season</h1>
          <h2>Sale 40% Off</h2>
          <h3>Shop Now</h3>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}
