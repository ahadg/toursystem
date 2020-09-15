import {CREATE_COMMENT,REVIEW_LIKEDISLIKE} from './types';
import axios from 'axios';
import {setAlert} from './setalert';
export const makeareview = (tourid,comment,review) => async dispatch => {
    try {

        let data = {
            tour : tourid,
            comment,
            rating : review,
          //  user : "5e6e56587067d038145844a4"
        }
        //console.log(id);
      await axios.post('/review', data)


        const tour = await axios.get(`http://127.0.0.1:5000/tour/${tourid}`)
      console.log(tour.data.tour.reviews);
        dispatch({
            type : CREATE_COMMENT,
            payload : tour.data.tour.reviews,
           
        })
    } catch (error) {
        console.log("error fetching data");
    }
    
    
    }

    export const like = id => async dispatch =>{
      try {
          console.log(id);
          console.log('like')
          const res = await axios.post(`http://127.0.0.1:5000/review/like/${id}`);
          console.log(res.data);
           // we could have th 
          dispatch({
              type : REVIEW_LIKEDISLIKE,
              payload : {id,tlike: res.data.likes,tdislike: res.data.dislikes}
          });
        //  dispatch(setAlert("liked","success"));
      } catch (error) {
        console.log(error)
        console.log(error.response)
       // dispatch(setAlert(error, 'danger'))
      }
  }
  
  export const dislike = id => async dispatch =>{
      try {
          const res = await axios.post(`http://127.0.0.1:5000/review/dislike/${id}`);
            console.log(res.data)
          dispatch({
            type : REVIEW_LIKEDISLIKE,
         payload : {id,tlike: res.data.likes,tdislike: res.data.dislikes}
          });
      } catch (error) {
        console.log(error)
        console.log(error.response)
//dispatch(setAlert(error.response.data.msg, 'danger'))
      }
  }

