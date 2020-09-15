import React, { useState } from 'react';

import {Link, Redirect} from 'react-router-dom';
//import './main.css';



const  Footer = () =>{
  

    return (
    
<div style={{backgroundColor : 'rgb(245, 243, 243)'}}>

  
 <div className="row">
 <div className="col-md-3 footer-left">
 <h4>Find Out More</h4>
 <ul className="footer_list">
  
   <li><a href="http://localhost:3000/contactus">Contact Us</a></li>
 </ul>
</div>
<div className=" col-md-6 footer_middle">
<h4>Be the first to know about Authentic Travel Deals</h4>
<p>Subscribe to get exclusive offers on the world’s greatest vacations.</p>

<form className="hero-cta__form">
  <div className="elcontainer">
    <div className="inner-wrap submit-container">
      <div className="hero-cta__input-wrap"> 
   </div>
   <Link to="/signup" >   <button type="submit" className="emailsignup">Sign Up</button></Link>
        </div>
  </div>
</form>
</div>
<div className="col-md-3 footer-right">
<div className="footerbox">
  <h4>Contact Us</h4>
  <p>We're ready to help!</p>
  <ul className="footer_list">
    <li>Pakistan | Multan</li>
    <li className="phone">+92 306 9595997</li>
    <li>Pakistan | Multan</li>
    <li className="phone">+62 2409796</li>
  </ul>
</div>
</div>

 </div>
 


 

  
  <div className="footer_bottom"><div className="col-lg-3 col-md-12 footer_copyright">
    <p>©2020 All rights reserved.</p>
  </div>

</div>
</div>



    )
}


export default Footer;
