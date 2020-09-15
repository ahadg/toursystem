import React, {useEffect, useState} from 'react';

import Rating from '@material-ui/lab/Rating';
import Pagination from './pagination';
import getalltours from '../../_actions/gettours';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Checkbox from '../Landingpage/checkbox/checkbox';

import { heartaction } from '../../_actions/hearts';
import {MDBBtn ,MDBCol, MDBIcon } from "mdbreact";
import Radiobox from '../Landingpage/radiobox/radiobox';
//import Overview from '../touroverview/overview';
import { Button,Accordion,
  Card } from 'react-bootstrap';
  import StarRatings from 'react-star-ratings';
  import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
  import PeopleIcon from '@material-ui/icons/People';
  import AirlineSeatLegroomNormalIcon from '@material-ui/icons/AirlineSeatLegroomNormal';
  import ExploreIcon from '@material-ui/icons/Explore';
  import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
  import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
  import RowingIcon from '@material-ui/icons/Rowing';
  import EventAvailableIcon from '@material-ui/icons/EventAvailable';
  import ScheduleIcon from '@material-ui/icons/Schedule';
  import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
  import moment from 'moment';
  
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaceIcon from '@material-ui/icons/Place';



// Component first alphabet should be capitalize

// location from props object
// you can find all other important thing on props
const MCard  = ({location,ourtours,getalltours,heartaction,theuser}) => {
//if(location.search){
// splice will just do remove the first index
//console.log(location.search)







var pairs = location.search.slice(1).split('&');
let result = {};

const [limit,setlimit] = useState(2);
let [skip,setskip] = useState(0);

const [filter,setfilter] = useState({
  city : [],
  price : []
})
const [search,setsearch] = useState('');

useEffect(()=> {
  pairs.forEach(function(pair){
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  })
  console.log(result)
  setsearch(result);
  console.log(search)
 const variable = {
   limit,
   skip,
   result
 }

  getalltours(variable);

   },[getalltours])

   const searchval = (e) => {
    setsearch(e.target.value);
   // console.log(search);
   //searchfield(e.target.value);
   setskip(0);
   setsearch(e.target.value);
   const variable = {
     limit,
     skip,
     searchterm : e.target.value
   }
  getalltours(variable);

  //searchedvalue(e.target.value);
 // console.log(e.target.value);

 // getalltours(search);
 // there is broblem with state when we do on change and setstate, always one letter missing/delays so not good at search
  }

const hearinc = (tourid) => {
 //let userid = '5e6e56587067d038145844a4';
  heartaction(tourid
    //,userid
    );
//console.log(tourid);
}

 
  let loadmore = (val) => {
    // console.log(val);
  console.log(search)
     skip = 2 * val;
   //  skip = skip + limit;
  //console.log(skip)
  if(result) {

  }
    const variables  = {
         skip : skip ,
         limit : limit,
         filter : filter,
        result : search,
         // searchterm : search,
        
         loadmore : true
    }
    console.log(variables);
    getalltours(variables);
    setskip(val);
  }



 const handlefactor = (value,city) =>{
     
   const newfactor = {...filter};
   newfactor[city] = value;
  
   console.log(newfactor);
  
   
   setfilter(newfactor)
   result = {
     limit,
     skip,
    filter : newfactor
  }
   //console.log(result)

   getalltours(result);

  }


  let totaltours = ourtours.loaded ? ourtours.tours.tourlength : 0 ;
  let hearts = theuser.isAuthenticated ? theuser.user.heart.map( cur => cur.id) : 0;
  console.log(hearts);
  let totaltourarray = [];
  //console.log(totaltours)
  for(let i =0 ; i<Math.ceil(totaltours/2); i++) {
    totaltourarray.push(i);
  }
 // console.log(totaltourarray)
    return (
      ourtours.loaded ? 
      <div>
    
      <div className="container">
     
      <Accordion>
      <div className="row">
      <div className="col">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
       Cities
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          <Checkbox handlefactor = {factor => handlefactor(factor,"city")}/>  
    
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      </div>
      <div className="col">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
      Price
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
          <Radiobox  handlefactor = {factor => handlefactor(factor,"price")} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      </div>
      </div>
    </Accordion>

    <input onChange={searchval} name="name" className="form-control mr-sm-2" type="search" placeholder="Search for a tour 'munal'" aria-label="Search" /> 
  
      <div className="row">
    
      {ourtours.tours.tourss.map((tour,index) =>(
        <div key={index} style={{'marginBottom' : '0px'}}>
 
      
   

      
     <div className="container">
     <div className="row ">
  <div className="col-md-9 offset-md-1">
   <div className="_blogCard mt-5 bg-white rounded" style={{"padding": "6px",'border' : 'solid 1px #d1cdc0'}}>
       <div className="row">
           <div className="col-lg-5 col-md-12 col-sm-12">
           <div className="row">
               <div className="col-md-12 img-mov" style={{'position': 'relative', "left": '-20px'}}>
             {theuser.isAuthenticated ?  
              (theuser.user.heart.map( cur => cur.id==tour.id)).includes(true) ? 
              <FavoriteIcon onClick={() => hearinc(tour._id)} style={{'position' : 'absolute', 'cursor': 'pointer','color' : 'red'}}/> 
              :  <FavoriteBorderIcon onClick={() => hearinc(tour._id)} style={{'position' : 'absolute', 'cursor': 'pointer'}}/> 

                 : <div></div>
              
            
            }
             
        
              <img style={{'height' : '240px'}} src={`http://localhost:5000/uploads/${tour.images[0]}`}  className="card-img"  />
               </div>
         <div className="col-md-12 d-inline-flex align-items-center justify-content-between">
           
         </div>
       
             </div>
           </div>
           <div className="col-lg-4 col-md-12 col-sm-12">
             <div className="row" style={{"width": "330px", "left": "-40px","position": "relative"}}>
                 <div className="col-md-12">
                  <div className="  border-bottom">
                   <div className="_bligTitle font-weight-bold h5">
                   {tour.name}

                     </div>
                     <div style={{'marginBottom' : '2px'}}>
                     <StarRatings
                     rating={tour.ratingAverage}
                     starRatedColor="orange"
                     starDimension="24px"
                     starSpacing="4px"
                   
                   />
                   </div>
                   ({tour.ratingquantity}) reviews
                    

                   </div>
                   <div className="_shareIcons align-self-end">
                   <div style={{paddingTop : '10px'}}>
                     <ul className="list-unstyled m-0 d-inline-flex">
                         <li className="ml-1 mr-1" >Group size
                        <strong style={{marginLeft: '5px'}}>{ tour.groupsize}</strong>
                         </li>
                         <li  className="ml-1 mr-1" > Difficulty
                         <strong style={{marginLeft: '5px'}}>{ tour.difficulty}</strong>
                         </li>
                      
                        
                       
                     </ul>
                     </div>
                     <div style={{paddingTop : '10px'}}>
                     <ul className="list-unstyled m-0 d-inline-flex">
                        
                         <li  className="ml-1 mr-1" >Tour guide <strong style={{marginLeft: '5px'}}>{ tour.tourguidename}</strong></li>
                      
                         <li  className="ml-1 mr-1">Age <strong style={{marginLeft: '5px'}}>{ tour.minAge} to { tour.maxAge}</strong></li>
                       
                     </ul>
                     </div>
                     <div style={{paddingTop : '10px'}}>
                     <ul className="list-unstyled m-0 d-inline-flex">
                       
                      
                         <li  className="ml-1 mr-1"><AirlineSeatReclineNormalIcon style={{marginRight : '10px'}} />
                         { tour.seatsavailable}
                         </li>
                       
                     </ul>
                     </div>
                     <div style={{paddingTop : '10px'}}>
                     <ul className="list-unstyled m-0 d-inline-flex">
                         <li  className="ml-1 mr-1" >
          <EventAvailableIcon style={{marginRight : '10px'}} />{moment(tour.startdate).format("MMM Do YYYY")}</li>

                     </ul>
                     </div>
                 </div>
                 </div>
                
             </div>
         </div>
           <div className="col-lg-3 col-md-12 col-sm-12">
               <div className="row">
                   <div className="col-md-12">
                    <div className="pd-2 mb-2 border-bottom">
                   <ScheduleIcon />   {tour.duration} days
                     <br/>
                  <PlaceIcon />   {tour.fromp} to {tour.to}
                  <br />
                  {tour.off && tour.off > 0 ?
                   <div>  From  <strong style={{fontSize : '20px','textDecoration':'line-through'}}>{tour.price}</strong> 
                     <br/> 
                 
                     
                    <strong style={{fontSize : '25px',color : '#3D9970'}}> {tour.price - tour.price/100 * tour.off} </strong>
                 
                     <br/>
                       <div className="badge badge-pill mt-2 bg-danger d-inline-flex align-items-center">
                           <i className="material-icon pt-1 pr-2 mr-1">{tour.off}% off</i>
                       </div>
                       <br/>
                     save  {tour.price/100 * tour.off} </div>
                     : 
                  <div>   From  <strong style={{fontSize : '20px','textDecoration':'line-through'}}>{tour.price}</strong> 
                         </div>
      }
              

                       <Link to={`/overview/${tour._id}`}  className="btn btn-info btn-lg btn-block">View tour</Link>

                       </div>
                   </div>
                   <div className="col-md-12">
                       <div className="_content mt-2">
                      
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
  </div>

     </div>
  


 </div>
 </div>  
     
     ))}
    
     </div>
     {
    /*   ourtours.tours.tourlength < 2 ? '' :   <nav aria-label="Page navigation example">
       <ul className="pagination">
         <li className="page-item"><a onClick={() => loadmore(skip-1)} className="page-link" href="#">Previous</a></li>
          {totaltourarray.map((val,index)=> 
           <li className="page-item"><a onClick={() =>loadmore(index)}  className="page-link" href="#">{index+1}</a></li>
          )}
       
         
         <li className="page-item"><a onClick={() => loadmore(skip+1)} className="page-link" href="#">Next</a></li>
       </ul>
     </nav>  */
     }
   
   
  
     </div>
     </div> : <p>Loading</p>
    )
}

const statetoprops =state =>({
  ourtours :  state.tourreducer,
  theuser : state.authreducer
})

export default connect(statetoprops,{getalltours,heartaction})(MCard);