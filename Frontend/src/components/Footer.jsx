import React from 'react'
import './Footer.css'
import mailpng from '../Shopwise/Mail.png'
import locationpng from '../Shopwise/Location.png'
import phonepng from '../Shopwise/phone.png'
import facebook from '../Shopwise/Facebook_Logo.png'
import instagram from '../Shopwise/instag.png'
import youtube from '../Shopwise/ytube.png'
import twitter from '../Shopwise/twitter.png'
export default function Footer() {
  return (
    <>
    <div className='footercss'>
        <div className='footerflex'>
            <div className='footerflexcolumn'>
            <div>
                <h1>Contact Info</h1><br/>
            <div className='imgflex'><img className="footerflexpng"src={mailpng}alt=""/><h2> 123 Street, Old Trafford,<br/>NewYork, USA</h2> </div><br/>
            <div className='imgflex'><img className="footerflexpng"src={locationpng}alt=""/><h2>info@sitename.com</h2></div><br/>
            <div className='imgflex'><img className="footerflexpng"src={phonepng}alt=""/><h2>+ 457 789 789 65</h2></div><br/><br/>
            <div className='imgflex'>
            <img className="footerflexpng"src={twitter} alt=""/>
            <img className="footerflexpng"src={facebook}alt=""/>
            <img className="footerflexpng"src={instagram}alt=""/>
            <img className="footerflexpng"src={youtube}alt=""/>
            </div><br/>
            </div>
        </div>
                <div className='footerflexcolumn'>
            <div>
                <h1>Useful Links</h1><br/>
            <h2>About Us</h2><br/>
            <h2>FAQ</h2><br/>
            <h2>Location</h2><br/>
            <h2>Affiliates</h2><br/>
            <h2>Contact</h2><br/>
            </div>
                </div>
                <div className='footerflexcolumn'>
            <div>
                <h1>My Account</h1><br/>
            <h2>My Account</h2><br/>
            <h2>Discount</h2><br/>
            <h2>Returns</h2><br/>
            <h2>Order Tracking</h2><br/>
            <h2>Orders History</h2><br/>
            </div>
                </div>
                <div className='footerflexcolumn'>
            <div>
                <h1>Subscribe Our Newsletter</h1><br/>
            <h2> If you want to get an email <br/>from us every time we <br/>have a new special offer,then sign up here!</h2><br/>
            <h2>info@sitename.com</h2><br/>
            <input className="footeremail" type="email" id="email" name="email" placeholder="Your email address"></input>
            </div>
                </div>
        </div>
    </div>
    </>
  )
}
