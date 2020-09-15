import React, {useState, useReducer,useEffect} from 'react';
import {connect} from 'react-redux';
import {Link,Redirect} from 'react-router-dom';

import StarRatings from 'react-star-ratings';
import getbooking from '../../_actions/bookings';




const Booking = ({getbooking,bookings}) => {
    useEffect(()=> {
      getbooking();
      },[])


    return (
        

        <div>
        <div className="left-sidebar">
     
        <div className="scroll-sidebar">
          
            <nav className="sidebar-nav">
            <ul id="sidebarnav">
            <li> <Link className="waves-effect waves-dark" to="/profile" aria-expanded="false"><i className="fa fa-tachometer"></i><span className="hide-menu">Profile</span></Link>
            </li>
            <li> <Link className="waves-effect waves-dark" to="/updatepassword" aria-expanded="false"><i className="fa fa-user-circle-o"></i><span className="hide-menu">Update Password</span></Link>
            </li>
            <li> <Link className="waves-effect waves-dark" to="/mybookings" aria-expanded="false"><i className="fa fa-user-circle-o"></i><span className="hide-menu">My Bookings</span></Link>
            </li>
           
        </ul>
      
            </nav>
         
        </div>
     
    </div>
        {
            bookings.bookingloaded ? 
            
    <div className="page-wrapper">
    
        <div className="container-fluid">
      
        <div className="row page-titles">
            <div className="col-md-5 align-self-center">
                <h3 className="text-themecolor">Your Bookings</h3>
               
            </div>
           
        </div>
        <div className="row">
        {bookings.mybookings.map((val,index) => 
     
           
         
          
            <div className=" col-md-4">
            <div
             key={index}
              className="card" style={{width: '18rem'}}>
            <img 
            src={`http://localhost:5000/uploads/${val.tour.images[0]}`} 
            className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{val.tour.name}</h5>
              <div style={{display : 'flex'}}>
         <StarRatings
        rating={val.tour.ratingAverage}
        starRatedColor="orange"
        starDimension="20px"
        starSpacing="4px"
      /> <div style={{marginTop : '5px' , marginLeft : '12px', fontSize : '17px', fontWeight : 'bold'}}>{val.tour.ratingquantity} </div>
      </div> 
            <h6>Seats booked</h6> {val.seats}
            <h6>Total Cost</h6>{val.price}
                <br/>
                <br/>
                 <Link to={`/overview/${val.tour.id}`}  className="btn btn-primary">Tour info</Link>
            </div>
          </div>
            </div>
          
  


     )}
     </div>
  </div>
</div>
            : <h2>Loading</h2>
        
              }
    
 
    </div>
    )

    
}

const  mapstatetoprop = state => ({
    bookings : state.tourreducer,
    
})


export default connect(mapstatetoprop,{getbooking})(Booking);