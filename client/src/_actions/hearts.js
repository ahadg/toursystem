import axios from 'axios';
import {ALLHEART,HEART,GET_USER} from './types';

export const heartaction =  (tourid) =>async dispatch => {
    try {
       console.log('heartfunction called')
      
          
     
        const res = await axios.post('http://127.0.0.1:5000/tour/heartbeat', {
           tourid
          
         
        });
       // console.log(res.data.tours)
        console.log(res.data);
  //     dispatch({
   //        type : HEART,
    //       heartdata : res.data.newuser.heart
     //  })
dispatch({
    type : GET_USER,
    payload : res.data.newuser
})
    } catch (error) {
        console.log(error.response)
     console.log("error fetching data")   
    }
}

export const getallhearts = () => async dispatch =>  {
    try {
       console.log('allheartfunction called')
    
        const res = await axios.post('http://127.0.0.1:5000/tour/heartbeattest');
       // console.log(res.data.tours)
        console.log(res.data);
       dispatch({
           type : ALLHEART,
           heartdata : res.data.user.heart
       })

    } catch (error) {
        console.log(error.response)
     console.log("error fetching data")   
    }
}

//export default heartaction;
