import React from 'react';
import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap';
import Parent from './components/Parent';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import Addproducts from './components/Addproducts'
import Register from './components/Register.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
const routers = createBrowserRouter ([
    {path:"/", element:<Parent/>},
    {path:"/Login" ,element:<Login/>},
    {path:"/register" ,element:<Register/>},
    {path:"/addproducts",element:<Addproducts/>},
    {path:"/singleproduct/:id" ,element:<SingleProduct/>},
    {path:"/Cart",element:<Cart/>},
  ])
root.render(
    <>
    <RouterProvider router={routers}/>
    </>
);
