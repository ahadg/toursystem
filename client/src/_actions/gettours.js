import {GET_TOURS} from './types';
import axios from 'axios';
import {connect} from 'react-redux';

const getalltours =  (search) =>async dispatch => {
    try {
    //    console.log(variable);
  // const variable = {
   //    limit : 4,
   //     skip : 0,
   //     search
   // }
  // let searchval = variable.search;
      
     //   console.log(typeof(search));
       // if(typeof(searchvalue) === 'object')
      //  {
       //   variable.filter= searchval;
       // }
      //  else 
      //  {
      //       variable.search = {
      //              searchterm : searchval
      //          }
      //  }
    // const variables = {
     //    searchterm : search
    // }
     console.log(search);
        const res = await axios.post('http://127.0.0.1:5000/tour/getalltour', search);
        console.log(res.data.tours)
     //   console.log(res);
     if (search.loadmore == 'true')
     {
        dispatch({
            type : GET_TOURS,
            payload : res.data.tours,
            loadmore : true
        })
  
     }
       dispatch({
           type : GET_TOURS,
           payload : res.data.tours
       })

    } catch (error) {
        console.log(error)
     console.log("error fetching data")   
    }
}

const statetoprops =state =>({
    ourtours :  state.tourreducer
  })


export default getalltours;