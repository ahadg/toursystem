import {GET_BOOKING} from './types';
import axios from 'axios';


 const getbookings = (user) => async dispatch => {
try {
  //  console.log(user);
  //  let body = {
  //      user
   // }
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



export default getbookings;


