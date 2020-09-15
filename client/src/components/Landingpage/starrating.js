import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';

const Starrating = ({newcomp}) => {
// console.log(newcomp());
  const [rating, setrating]  = useState(null);
    const [hover, sethover] = useState(null);
    const adjust = (id) => {
     setrating(id);
     newcomp(id);
    }
    //newcomp(2);
    return (
        <div>
        {[...Array(5)].map((star,i) => {
            const ratingvalue = i+1;
     return (  
     <label key={i} className="yoo">
    
     <input style={{'display' : 'hide'}}
     type="radio" name="rating"
     value={ratingvalue} 
     onClick={
      () => adjust(ratingvalue)}
      
     />
     <FaStar
     className="star"
     // we comparing with hover and rating so set rating too
     color={ ratingvalue <= (hover || rating) ? '#ffc107' : '#e4e5e9' } 
     size={30}
     onMouseEnter={() => sethover(ratingvalue)}
     onMouseLeave={()=> sethover(null)}
     />
    </label>
     );
    })}
    <h1>rating is {rating}</h1> 
    </div>
       )
}

export default Starrating;