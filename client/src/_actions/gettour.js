import {GET_TOUR,GET_BOOKING} from './types';
import axios from 'axios';


 const gatatour = (id) => async dispatch => {
try {
    console.log(id);
    const tour = await axios.get(`http://127.0.0.1:5000/tour/${id}`)
  console.log(tour.data.tour);
    dispatch({
        type : GET_TOUR,
        payload : tour.data.tour,
       
    })
    const bookedtour = await axios.get(`http://127.0.0.1:5000/user/getbookings`)
    //console.log(bookedtour);
      dispatch({
          type : GET_BOOKING,
          payload : bookedtour.data.bookings,
         
      })
} catch (error) {
    console.log("error fetching data");
}


}



export default gatatour;


