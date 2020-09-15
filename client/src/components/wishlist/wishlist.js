import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RowingIcon from '@material-ui/icons/Rowing';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PlaceIcon from '@material-ui/icons/Place';
import {connect} from 'react-redux';
import {heartaction,getallhearts} from '../../_actions/hearts';


const Wishlist  = ({hearts,heartaction,getallhearts,theuser}) => {
  useEffect(()=> {
   
    getallhearts();
     },[getallhearts])
     console.log(hearts);




     const hearinc = (tourid) => {
      //let userid = '5e6e56587067d038145844a4';
       heartaction(tourid
         //,userid
         )};
    return (
       
      <div>
  
      { `${hearts.loaded}` === 'true' ? <div>Not loaded</div> : <div> 


      {hearts.heartlist.map((tour,index) =>(
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
                           <li className="ml-1 mr-1">Group size
                          <strong>{tour.groupsize}</strong>
                           </li>
                           <li  className="ml-1 mr-1" > Seats available
                           <strong>{tour.seatsavailable}</strong>
                           </li>
                        
                          
                         
                       </ul>
                       </div>
                       <div style={{paddingTop : '10px'}}>
                       <ul className="list-unstyled m-0 d-inline-flex">
                          
                           <li  className="ml-1 mr-1" >Tour guide <strong>{tour.tourguidename}</strong></li>
                        
                           <li  className="ml-1 mr-1">Age <strong>{tour.minAge} to {tour.maxAge}</strong></li>
                         
                       </ul>
                       </div>
                       <div style={{paddingTop : '10px'}}>
                       <ul className="list-unstyled m-0 d-inline-flex">
                         
                        
                           <li  className="ml-1 mr-1"><RowingIcon style={{marginRight : '10px'}} />
                           Adventure
                           </li>
                         
                       </ul>
                       </div>
                       <div style={{paddingTop : '10px'}}>
                       <ul className="list-unstyled m-0 d-inline-flex">
                           <li  className="ml-1 mr-1" ><EventAvailableIcon style={{marginRight : '10px'}} />5th january</li>
  
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
                   
                       From {tour.price - tour.price/100 * tour.off} 
                   
                       <br/>
                         <div className="badge badge-pill mt-2 bg-primary d-inline-flex align-items-center">
                             <i className="material-icon pt-1 pr-2 mr-1">{tour.off}% off</i>
                         </div>
                         <br/>
                       save  {tour.price/100 * tour.off} 
                 <br/>
  
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
    }

     </div>
    )
}

const statetoprops = (state) => ({
  hearts : state.heartreducer,
  theuser : state.authreducer
})

export default connect(statetoprops, {heartaction,getallhearts})(Wishlist);