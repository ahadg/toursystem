import React, {useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {Container,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';


import landingpagedata from '../../_actions/landingpage';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Starrating from './starrating';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slickstyle.css"
import Slider from "react-slick";
import {Login} from '../../_actions/auth'; 
import StarRatings from 'react-star-ratings';
import DatePicker from 'react-date-picker';
import {Spring, config} from 'react-spring/renderprops'
import Footer from '../Footer/footer';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PaymentIcon from '@material-ui/icons/Payment';
import PublicIcon from '@material-ui/icons/Public';
import loadingimage from '../Spinner-1s-200px.gif'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';









import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView} from "mdbreact";

const Landingpage = ({landingdata,landingpagedata}) => {

  const [selectedDate, setSelectedDate] = useState(new Date());





  //  console.log(props);
  //const search = 'multan';
   //  const gettours = (e) => {
  // e.preventDefault();
     ///  getalltours();
     //  alert("alerttt");
   ///  } 
  // console.log(landingdata);
   //console.log(landingdata.landingdata.tours);

   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
   useEffect(()=> {
   landingpagedata();
   }, [landingpagedata])
    return (
    <div>

    { `${landingdata.loading}` === 'true' ? <div>

    <img src={loadingimage} style={{marginLeft: '43%'}} />



    </div> : <div> 
  
    

  
        {
          //<img src="http://localhost:5000/img/users/user-1.jpg" className="card-img-top" alt="..." />
        }
         
            <MDBCarousel style={{'width' : '100%', 'height' : '100%'}}
            activeItem={1}
            length={3}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
            
          >
          
            <MDBCarouselInner>
             
        <div id="mcard" className="card">
        <div className="card-body">
            <div className="innercardbody">
             <form action="/card" method="GET">
              
              
                    <h3 className="card-title">Discover amazing places with us</h3>
                   
                  <div className="lower">
                    <div className="form-group">

                        <input name="city" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search for 'Multan' or 'Lahore' (City) " />
                        
                      </div>
                     <input name="startdate" type="date" />
                     <br/>
                    
                    <button style={{marginTop : '20px'}} type="submit" className="btn btn-primary" href="#" >Search</button>
                    <button style={{marginTop : '20px',marginLeft : '10px'}} type="submit" className="btn btn-primary" href="#" >Go for All tours</button>
                     
                    </div>
                </form>
              </div>
            </div>
         
        </div>
              <MDBCarouselItem itemId="1">
                <MDBView>
                  <img
                    className="d-block w-100"
                    src="/images/tour-1-1.jpg"
                    alt="First slide"
                  />
                </MDBView>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="2">
                <MDBView>
                  <img
                    className="d-block w-100"
                    src="/images/tour-6-3.jpg"
                    alt="Second slide"
                  />
                </MDBView>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="3">
                <MDBView>
                  <img
                    className="d-block w-100"
                    src="/images/tour-4-3.jpg"
                    alt="Third slide"
                  />
                </MDBView>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </MDBCarousel>
      
        
      <div className="mini-card" style={{'textAlign' : 'center', 'verticalAlign' : 'middle'}}>
      <div className="row" style={{'padding' : '20px'}}>
          <div className="col-md-3 card-items">
          <Spring
          config={{tension: 1128, friction: 7135, precision: 4, velocity : -77,duration : 3000}}
  from={{ number: 1 }}
  to={{ number: landingdata.landingdata.totalstats[0].avgRating }}
  >
  {props => <div>
    <StarRatings
    rating={props.number}
    starRatedColor="orange"
    starDimension="27px"
    starSpacing="4px"
  />
    <h4>
    {props.number.toPrecision(3)}
     </h4>
    </div>}
</Spring>
          <h4>Rating from  {landingdata.landingdata.totalstats[0].numTours} tours</h4>
            <p>We are getting reviews from peoples</p>
        </div>
          <div className="col-md-3 card-items">
          <LocalOfferIcon style={{'fontSize' : '35px', 'color' : '#85002a'}}/>
            <h4> Best Price Guarantee</h4>  
            <p>Found a lower price elsewhere? We'll match it!</p>
           </div>
          <div className="col-md-3 card-items">
          <PaymentIcon style={{'fontSize' : '35px',  'color' : '#159c00' }}/>
            <h4>Secure Payments</h4>  
            <p>We use Braintree, a subsidiary of PayPal, to make payments safe and secure.</p>
            </div>
          <div className="col-md-3 card-items">
          <PhoneOutlinedIcon style={{'fontSize' : '35px'}}/>
            <h4> 24/7 Support</h4>  
            <p>We're available to answer any questions or concerns via online chat, phone or email.</p>
           </div>

           </div>
      </div>
   
    
      <h2 style={{textAlign: 'center'}}>Our Top Rated tours</h2>
      <div style={{'padding' : '45px'}}>
     
      <Slider  {...settings}>
      {
        landingdata.landingdata.tours.map((tour,index) => (
          <Col md="3">
         <div key={index}  className="card" style={{width: '18rem'}}>
           <img src={`http://localhost:5000/uploads/${tour.images[0]}`} className="card-img-top" alt="..." />
           <div className="card-body">
           <p><PublicIcon  style={{'fontSize' : '20px'}}/>  {tour.city}</p>
           <h5 className="card-title">{tour.name}</h5>
           <div style={{display : 'flex'}}>
      <StarRatings
     rating={tour.ratingAverage}
     starRatedColor="orange"
     starDimension="20px"
     starSpacing="4px"
   /> <div style={{marginTop : '5px' , marginLeft : '12px', fontSize : '17px', fontWeight : 'bold'}}>{tour.ratingquantity} </div>
   </div> 
   <p style={{'marginBottom' : '0'}}>{tour.duration} days</p>
         
   {tour.off && tour.off > 0 ?
    <p>    From 
    <strong style={{ 'paddingLeft' : '10px'}}>
    Rs
    </strong>
     <strong style={{'fontSize' : '20px', 'padding' : '5px','textDecoration':'line-through'}}> {tour.price}</strong>
 <strong> {Math.floor(tour.price - tour.price/100 * tour.off)}</strong> 
      </p>
        :
        <p>      From <strong style={{'fontSize' : '40px', 'padding' : '20px'}}>Rs {tour.price}</strong>
        </p>
      }
             <Link to={`/overview/${tour._id}`}  className="btn btn-primary">View tour</Link>
           </div>
         </div>
         </Col>
       ))
     }
      </Slider>
</div>



      <h2 style={{textAlign: 'center'}}>Our Top 8 cheapest and best reviews</h2>
      
<div className="mycards">
    {
     landingdata.landingdata.tours.map((tour,index) => (
      <div key={index}  className="card" style={{width: '18rem'}}>
        <img src={`http://localhost:5000/uploads/${tour.images[0]}`} className="card-img-top" alt="..." />
        <div className="card-body">
        <p><PublicIcon  style={{'fontSize' : '20px'}}/>  {tour.city}</p>
          <h5 className="card-title">{tour.name}</h5>
          <div style={{display : 'flex'}}>
     <StarRatings
    rating={tour.ratingAverage}
    starRatedColor="orange"
    starDimension="20px"
    starSpacing="4px"
  /> <div style={{marginTop : '5px' , marginLeft : '12px', fontSize : '17px', fontWeight : 'bold'}}>{tour.ratingquantity} </div>
  </div> 
  <p style={{'marginBottom' : '0'}}>{tour.duration} days</p>
  {tour.off && tour.off > 0 ?
    <p>    From 
    <strong style={{ 'paddingLeft' : '10px'}}>
    Rs
    </strong>
     <strong style={{'fontSize' : '20px', 'padding' : '5px','textDecoration':'line-through'}}> {tour.price}</strong>
 <strong> {tour.price - tour.price/100 * tour.off}</strong> 
      </p>
        :
        <p>      From <strong style={{'fontSize' : '40px', 'padding' : '20px'}}>Rs {tour.price}</strong>
        </p>
      }
            
             <Link to={`/overview/${tour._id}`}  className="btn btn-primary">View tour</Link>
        </div>
      </div>
    ))
  }
      
  </div>


      
         <h3 style={{textAlign: 'center'}}> Top 4 cities in Pakistan with best ratings </h3>
       <div  className="classytours" style={{'textAlign': 'center'}}>
       {
         
        landingdata.landingdata.citystats.slice(0,4).map((stat,index) => (
        <div key={index} id="card35" className="card" style={{width: '18rem'}}>
            <img style={{'opacity' : '0.7'}} src="./images/tour-1-1.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{stat._id}</h5>
              <p className="card-text">{stat.numTours} tours</p>
              <StarRatings
              rating={stat.avgRating}
              starRatedColor="#ffc933"
              starDimension="27px"
              starSpacing="4px"
            />
            
            </div>
          </div> 
        ))
       }
        </div>
        </div>
    }
    <Footer />
      </div>
      
    )
}

const statetoprops = state => ({
  landingdata : state.landingdata
})

export default connect(statetoprops,{landingpagedata})(Landingpage);