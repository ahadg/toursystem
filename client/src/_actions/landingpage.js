import axios from 'axios';
import {LANDING_PAGE,GET_USER,LOGIN_FAIL,LOGIN_SUCCESS} from './types';



const landingpagedata =  () =>async dispatch => {
    try {
       console.log('landingfunction called')
    
        const res = await axios.get('http://127.0.0.1:5000/tour/landingdata');
       // console.log(res.data.tours)
        console.log(res.data);
       dispatch({
           type : LANDING_PAGE,
           landingdata : res.data
       })

    } catch (error) {
        console.log(error)
     console.log("error fetching data")   
    }
}

export default landingpagedata;
