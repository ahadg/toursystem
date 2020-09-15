import uuid from 'uuid/v4';
import { SET_ALERT , REMOVE_ALERT} from './types';

// we able to dispatch bcz of thunk middleware
// double arrow function
// const add = (x,y) => x + y     or add = x => y => x + y // funtion inside function
// function add(x) {function (y) return x +y} //  add(2)(3)
export const setAlert = (msg , alerttype) => dispatch =>{
    // get random universal id 
 const id = uuid();
 console.log(id);
 dispatch({
     type : SET_ALERT,
     payload : {msg, alerttype, id}
 })

 setTimeout(() => dispatch({type : REMOVE_ALERT, payload:id}), 5000)
}