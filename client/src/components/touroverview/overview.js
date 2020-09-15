import React, {Fragment,useEffect,useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';


import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './star.css';
import {makeareview,like,dislike} from '../../_actions/reviews';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import Starrating from '../Landingpage/starrating';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import Footer from '../Footer/footer';
import moment from 'moment';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import loadingimage from '../Spinner-1s-200px.gif'



import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import HotelIcon from '@material-ui/icons/Hotel';
import HouseIcon from '@material-ui/icons/House';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';


import getatour from '../../_actions/gettour';
import { MDBCarousel, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText
  ,MDBCol, MDBIcon, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer,MDBRow,
  MDBCollapse
} from
"mdbreact";


import {loadStripe} from '@stripe/stripe-js';



import { Button,Accordion,
Card } from 'react-bootstrap';



// Component first alphabet should be capitalize


const Touroverview  = ({rating,makeareview,thetour,theuser,like,dislike,getatour,match}) => {
  useEffect(()=> {
    console.log(match.params.id);
  getatour(match.params.id);
 // console.log(ourtour);
  },[getatour])
  //const getall = () => {
   // getalltours();
  //}
  //console.log(thetour);
  //console.log(thetour.reviews);
  let totalreview=0;
  let totals = 0;

  let [review, setreview]= useState(null);
 //let review = 3; 
 console.log(review);
 


/// rating were saving as a null if we dont rate
// so making an error
// always keep in mind of exceptions


// also other ratingaverage and rating quantity,
// while calculating giving error, saving as empty string or null
// so set dafault value as 0



 let makereview = () => {
 // alert("make review");
  if(!review || review < 1)
  {
    review = 1
  }
  makeareview(match.params.id,comment,review);
}
let addlike = (id) => {
  console.log(id);
  like(id);
}
let adddislike = (id) => {
  dislike(id);
}

const [comment,setcomment] = useState('');
//1console.log(comment);
const [seats,setseats] = useState(1);

let seatsavail = [];
for(let i =1 ; i<= thetour.tour.seatsavailable; i++) 
{
 
   seatsavail.push(<option>{i}</option>)
}


const booktour = async (tourid) => {
  console.log(tourid);
  console.log(seats);
  let user =      theuser.user.id
  try {
    let data = {
      tourid,
      seats,
    user
    }
    const stripe = await loadStripe('pk_test_AqcmA0ve6dgMgPyVfH8FhKyb0038dMgI64');
    const session = await axios.post(`http://127.0.0.1:5000/user/booktour`, data)
  
    console.log(session);
    await stripe.redirectToCheckout({
        sessionId : session.data.session.id
    })

} catch (error) {
      console.log(error);
  }
  
  

 
}

let checkbooking = thetour.mybookings.map((val) => val.tour.id == thetour.tour.id);
console.log(checkbooking);



const handletoken = (token,address) => {
console.log(token,address)
}

  const style ={
    paddingRight : '30px'
  }
  
    return (
      <Fragment>
       {
         thetour.tourloaded
         ?
        <div>

         <div style={{'padding' : '20px'}}>  
        
     
         <MDBRow>
     <MDBCol md="8">   <MDBCarousel style={{'width' : '100%', 'height' : '87%'}}
     activeItem={1}
     length={thetour.tour.images.length}
     showControls={true}
     showIndicators={true}
     className="z-depth-1"
     
   >
     <MDBCarouselInner>
     
     {
     thetour.tour.images.map((image,index) => (
        <MDBCarouselItem itemId={`${index+1}`}>
        <MDBView>
          <img style={{width : '60px', height : '390px'}}
            className="d-block w-100"
            src={`http://localhost:5000/uploads/${image}`}
            alt="First slide"
          />
        </MDBView>
      </MDBCarouselItem>
      ))
      
          
           }
     </MDBCarouselInner>
   </MDBCarousel>
   </MDBCol>
     <MDBCol md="4">
 
     <MDBCard narrow>
       
 
       <MDBCardBody>
         <h5 className='pink-text'>
           <MDBIcon icon='utensils' /> {thetour.tour.duration} days
         </h5>
 
         <MDBCardTitle className='font-weight-bold'>
          {thetour.tour.name}
         </MDBCardTitle>
 
         <MDBCardText>
         From <strong>{thetour.tour.fromp}</strong> To <strong>{thetour.tour.to}</strong>
      <br/>   <EventAvailableIcon style={{marginRight : '10px'}} />{moment(thetour.tour.startdate).format("MMM Do YYYY")}
         <table>
         <tbody>
         <tr>
         <td style={style}><strong>Location:</strong><br/>{thetour.tour.city}</td>
         <td  style={style}><strong>Tour Operator:</strong><br/>{thetour.tour.tourguidename}</td>
         <td  style={style}><strong>Difficulty:</strong><br/>{thetour.tour.difficulty}</td>
        
         </tr>
         <tr>
         <td  style={style}><strong>Age Range:</strong><br/>{thetour.tour.minAge} to 25</td>
         <td  style={style}><strong>Max Group:</strong><br/>{thetour.tour.groupsize}</td>
         <td  style={style}><strong>Seats Available:</strong><br/>{thetour.tour.seatsavailable}</td>
         </tr>
         </tbody>
         </table>
      
         {thetour.tour.off && thetour.tour.off > 0 ?
      <p>    From 
      <strong style={{'fontSize' : '40px', 'paddingLeft' : '20px'}}>
      Rs
      </strong>
       <strong style={{'fontSize' : '40px', 'padding' : '20px','textDecoration':'line-through'}}> {thetour.tour.price}</strong>
   <strong> {thetour.tour.price - thetour.tour.price/100 * thetour.tour.off}</strong> 
                 
          <br/>
            <div className="badge badge-pill mt-2 bg-primary d-inline-flex align-items-center">
                <i className="material-icon pt-1 pr-2 mr-1" style={{'color': 'white','fontSize': '15px','marginBottom': '5px'}}>{thetour.tour.off}% off</i>
            </div>
            <br/>
          save <strong>{Math.floor(thetour.tour.price/100 * thetour.tour.off)}</strong>   </p>
          :
          <p>      From <strong style={{'fontSize' : '40px', 'padding' : '20px'}}>Rs {thetour.tour.price}</strong>
          </p>
        }
      
      
         </MDBCardText>
 
        
       </MDBCardBody>
     </MDBCard>
   </MDBCol>
 
   </MDBRow>
   {

    thetour.tour.reviews.map((revi,i) =>  {
 
   totalreview=   totalreview +  revi.rating;
   totals++;
  
    })
  }
 
 <div style={{'display' : 'flex', 'flexWrap' :'wrap', 'justifyContent' : 'space-around'}}>
 <div style={{'display' : 'flex'}}>
 <StarRatings
   rating={totals < 1 ? 0 : totalreview/totals }
    starRatedColor="orange"
    starDimension="30px"
    starSpacing="8px"
  /> 
  <h3>{totals}</h3>
  </div>
  { thetour.tour.seatsavailable == 0 ?  <h4>Sorry no seats are available wait for next date</h4> : 
    <React.Fragment>
    <div class="form-group" style={{'display' : 'flex'}}>
    <h4>Seats</h4>
    <select onChange={(e)=> setseats(e.target.value)} class="form-control" id="sel1">
  
    { seatsavail.map(val => val)}
    </select>
  </div>
  
     <button onClick={()=>booktour(thetour.tour._id)} className="btn btn-info">Book tour now</button> 
     </React.Fragment>
    }
 
</div>


   <h2><strong>Overview</strong></h2>
   <p>
   
  
   {thetour.tour.overview}
 
 
   </p>
  
   <div className="container">
   <div className="row" style={{textAlign: 'center',backgroundColor:'#dcdbdb',marginBottom:'20px',padding:'20px'}}>
     <div className="col-md-6">
       <h3 style={{fontWeight:'bolder'}}>Tour Guide</h3>
     
     
       Name : {thetour.tour.tourguidename}
       <br/>
       Gender : {thetour.tour.guidegender}
       <br /> 
       Phone no : {thetour.tour.guidenumber}
     </div>
     <div className="col-md-6">
     <img style={{width : '85px',height : '85px',borderRadius : '50%'}} src={`http://localhost:5000/uploads/${thetour.tour.guidepicture}`} alt="user" className="" /> 
     </div>
   </div>
  
   </div>
   <Accordion>
   <Card>
     <Accordion.Toggle as={Card.Header} eventKey="0">
     What's Included
     </Accordion.Toggle>
     <Accordion.Collapse eventKey="0">
       <Card.Body>

       {thetour.tour.included}
       </Card.Body>
     </Accordion.Collapse>
   </Card>
   <Card>
     <Accordion.Toggle as={Card.Header} eventKey="1">
     Departure & Return
     </Accordion.Toggle>
     <Accordion.Collapse eventKey="1">
       <Card.Body>
       {thetour.tour.depandretrn}
       </Card.Body>
     </Accordion.Collapse>
   </Card>
   <Card>
     <Accordion.Toggle as={Card.Header} eventKey="3">
     What To Expect
     </Accordion.Toggle>
     <Accordion.Collapse eventKey="3">
       <Card.Body>
         {thetour.tour.expect}
 
    
       </Card.Body>
     </Accordion.Collapse>
   </Card>
 </Accordion>

 <h3 style={{padding : '25px'}}>What's included to eat</h3>

 {thetour.tour.refreshments ? 
 
   <div>
    <div style={{display : 'flex', flexDirection : 'row'}}>
      <img style={{width : '60px', height : '60px',marginTop: '10px'}}
      className="d-block pt-1"
      src={`http://localhost:5000/img/dinner.png`}
      alt="First slide"
    />  
    <h4 style={{marginTop : '23px',marginLeft: '55px'}}>Dinner :</h4>
   
   {thetour.tour.refreshments.includes('dinner') ?  <img style={{width : '60px', height : '60px',marginTop : '10px', marginLeft : '55px'}}
    className="d-block "
    src={`http://localhost:5000/img/tick.webp`}
    alt="First slide"
  /> : 
  <img style={{width : '60px', height : '60px',marginTop : '10px', marginLeft : '55px'}}
  className="d-block "
  src={`http://localhost:5000/img/cross2.webp`}
  alt="First slide"
/>
  }
  
    </div>
  <hr/>
   
  <div style={{display : 'flex', flexDirection : 'row'}}>
      <img style={{width : '60px', height : '60px',marginTop: '10px'}}
      className="d-block pt-1"
      src={`http://localhost:5000/img/breakfast.png`}
      alt="First slide"
    />  
    <h4 style={{marginTop : '23px',marginLeft: '55px'}}>Breakfast :</h4>
   
   {thetour.tour.refreshments.includes('breakfast') ?  <img style={{width : '60px', height : '60px',marginTop : '10px', marginLeft : '55px'}}
    className="d-block "
    src={`http://localhost:5000/img/tick.webp`}
    alt="First slide"
  /> : 
  <img style={{width : '60px', height : '60px',marginTop : '10px', marginLeft : '55px'}}
  className="d-block "
  src={`http://localhost:5000/img/cross2.webp`}
  alt="First slide"
/>
  }
  
    </div>
 
<hr/>

<div style={{display : 'flex', flexDirection : 'row'}}>
      <img style={{width : '60px', height : '60px',marginTop: '10px'}}
      className="d-block pt-1"
      src={`http://localhost:5000/img/lunch.png`}
      alt="First slide"
    />  
    <h4 style={{marginTop : '23px',marginLeft: '55px'}}>Lunch :</h4>
   
   {thetour.tour.refreshments.includes('lunch') ?  <img style={{width : '60px', height : '60px',marginTop : '10px', marginLeft : '55px'}}
    className="d-block "
    src={`http://localhost:5000/img/tick.webp`}
    alt="First slide"
  /> : 
  <img style={{width : '60px', height : '60px',marginTop : '10px', marginLeft : '55px'}}
  className="d-block "
  src={`http://localhost:5000/img/cross2.webp`}
  alt="First slide"
/>
  }
  
    </div>




<hr/>


<div style={{display : 'flex', flexDirection : 'row'}}>
      <img style={{width : '60px', height : '60px',marginTop: '10px'}}
      className="d-block pt-1"
      src={`http://localhost:5000/img/refreshments.png`}
      alt="First slide"
    />  
    <h4 style={{marginTop : '23px',marginLeft: '55px'}}>Refreshments :</h4>
   
   {thetour.tour.refreshments.includes('refreshments') ?  <img style={{width : '60px', height : '60px',marginTop : '10px', marginLeft : '55px'}}
    className="d-block "
    src={`http://localhost:5000/img/tick.webp`}
    alt="First slide"
  /> : 
  <img style={{width : '60px', height : '60px',marginTop : '10px', marginLeft : '55px'}}
  className="d-block "
  src={`http://localhost:5000/img/cross2.webp`}
  alt="First slide"
/>
  }
  
    </div>


<hr/>
</div>

   : '' 
}

<h3 style={{padding : '25px'}}>Where you'll  stay</h3>
  

 
 <div>
  <div style={{display : 'flex', flexDirection : 'row'}}>
    <img style={{width : '60px', height : '60px',marginTop: '10px'}}
    className="d-block pt-1"
    src={`http://localhost:5000/img/hotel2.Webp`}
    alt="First slide"
  />  
  <h4 style={{marginTop : '23px',marginLeft: '55px'}}>Hotel :</h4>
 
 { thetour.tour.hotel < 1  ?  <h6 style={{marginTop : '29px',marginLeft: '55px'}}> We will not stay in a hotel</h6> : 
 <h5 style={{marginTop : '25px',marginLeft: '55px'}}> <strong style={{marginRight: '10px'}}>{thetour.tour.hotel}</strong>days</h5>
}

  </div>
<hr/>
 
<div style={{display : 'flex', flexDirection : 'row'}}>
    <img style={{width : '60px', height : '60px',marginTop: '10px'}}
    className="d-block pt-1"
    src={`http://localhost:5000/img/house.webp`}
    alt="First slide"
  />  
  <h4 style={{marginTop : '23px',marginLeft: '55px'}}>Guest House :</h4>
 
  {
   thetour.tour.guesthouse < 1  ?  <h6 style={{marginTop : '29px',marginLeft: '55px'}}> We will not be able to stay in a house</h6> : 
 <h5 style={{marginTop : '25px',marginLeft: '55px'}}> <strong style={{marginRight: '10px'}}>{thetour.tour.guesthouse}</strong>days</h5>
}

  </div>

<hr/>

<div style={{display : 'flex', flexDirection : 'row'}}>
    <img style={{width : '60px', height : '60px',marginTop: '10px'}}
    className="d-block pt-1"
    src={`http://localhost:5000/img/camping2.png`}
    alt="First slide"
  />  
  <h4 style={{marginTop : '23px',marginLeft: '55px'}}>Camping :</h4>

  { thetour.tour.camping < 1 || !thetour.tour.camping ? 
   <h6 style={{marginTop : '29px',marginLeft: '55px'}}> We will not do camping</h6> 
   : 
 <h5 style={{marginTop : '25px',marginLeft: '55px'}}> <strong style={{marginRight: '10px'}}>{thetour.tour.camping}</strong>days</h5>
}

  </div>




<hr/>





<hr/>
</div>

 

 
 
 <h3>Reviews</h3>
 {  thetour.reviewsloaded ?    thetour.reviews.map((rev,i) => 

   <Card key={i} style={{maxWidth: '900px'}}>
   {console.log(rev)}
   <Card.Body>
     <Card.Title>
     <img style={{width : '35px',height : '35px',borderRadius : '50%'}} src={`http://localhost:5000/uploads/${rev.user.photo}`} alt="user" className="" /> 
     <span style={{'marginLeft': '5px'}} className="hidden-md-down">{rev.user.name}&nbsp;</span> 
     </Card.Title>
     <Card.Subtitle className="mb-2 text-muted">
     <StarRatings
     rating={rev.rating }
      starRatedColor="orange"
      starDimension="20px"
      starSpacing="5px"
    /> 
     
     </Card.Subtitle>
     
     <Card.Subtitle className="mb-2 text-muted">
     {moment(rev.date).fromNow()}</Card.Subtitle>
     <Card.Text>
     {rev.comment}
     </Card.Text>
     
      <ThumbUpAltOutlinedIcon onClick={() => addlike(rev.id)}  />
    {rev.likes.length}

     <ThumbDownAltOutlinedIcon onClick={() => adddislike(rev.id)}/>
     {rev.dislikes.length}
   </Card.Body>
 </Card>
 )    : <p>reviews loading</p>}

 {checkbooking.includes(true) ? 
 <div>
 <h2>Add a review</h2>

  <div className="form-group">
   
  <div className="form-group">
  <Starrating newcomp={setreview} /> 

    <textarea onChange={e => setcomment(e.target.value)} id="reviewss" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <button onClick={
    () => makereview()
  
  } type="button" className="btn btn-dark">Submit</button>
  </div>
  </div> : ''
}
 

   </div>
  <Footer />
      </div> :  <img src={loadingimage} style={{marginLeft: '43%'}} />
    }

     </Fragment>
        
      
    )
}

const mapstatetoprops =state =>({
  thetour : state.tourreducer,
  theuser : state.authreducer,
})


export default connect(mapstatetoprops,{getatour,makeareview,like,dislike})(Touroverview);

 