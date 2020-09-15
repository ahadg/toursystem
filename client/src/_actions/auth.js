import axios from 'axios';
import {SIGNUP_SUCCESS,GET_USER,LOGIN_FAIL,LOGIN_SUCCESS,AUTHENTICATION_FAIL,INITIAL_DATA} from './types';


import {setAlert} from './setalert';
import setAuthToken from '../utils/setAuthtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export const loaduser = () => async dispatch => {
    console.log('loaduser called');
    if(localStorage.thetokenx) {
        setAuthToken(localStorage.thetokenx);
    }

    try {
        const res = await axios.get('http://127.0.0.1:5000/user/getdata');
   console.log(res.data.myuser);
        dispatch({
            type:GET_USER,
            payload: res.data.myuser
        });
    } catch (error) {
        dispatch({
            type : AUTHENTICATION_FAIL
        })
    }
}

export const initialdata =  (email) => async dispatch => {
    console.log('you called me');
   // email = 'ahad201@gmail.com';
   // password = 'test1234';
   console.log(email);
  
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({email});
   try {
     
       const res=   await axios.post('http://127.0.0.1:5000/user/getinitialdata',body,config);
      // await axios.post('http://127.0.0.1:5000/review', data)
       console.log(res.data);
       dispatch({
           type : INITIAL_DATA,
           payload : res.data
       })
       loaduser();
   } catch (error) {
       // you can get the error//
       // always use response.data so that we can clearly see the error
       console.log(error.response);
      dispatch({
          type : LOGIN_FAIL,
          payload : error
      })
     
   }
} 



export const login =  (email,password) => async dispatch => {
   // console.log('you called me');
   // email = 'ahad201@gmail.com';
   // password = 'test1234';
  // console.log(email);
  // console.log(password);

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({email, password});
   try {
      
       const res=   await axios.post('http://127.0.0.1:5000/user/signin',body,config);
      // await axios.post('http://127.0.0.1:5000/review', data)
       console.log(res.data);
       dispatch({
           type : LOGIN_SUCCESS,
           payload : res.data
       })
       loaduser();
   // const history = useHistory();
   toast.success("Login Success !",  {
  
    autoClose: 2000, 
  
});
let fun = () => {
    window.location.href = 'http://localhost:3000/'
   }
   setTimeout(() => {
       fun()
   }, 2000);
  
   } catch (error) {
       // you can get the error//
       // always use response.data so that we can clearly see the error
       console.log(error.response.data);
      dispatch({
          type : LOGIN_FAIL,
          payload : error
      })
     dispatch (setAlert(error.response.data.message,'danger'));
   }
} 

export const signup =  (username,email,password,confirmpassword) => async dispatch => {
  //  console.log('you called me');
   // email = 'ahad201@gmail.com';
   // password = 'test1234';
  // console.log(email);
  // console.log(password);
  var letters = /^[A-Za-z]+$/;
  if(!email || !username || !password || !confirmpassword) 
  {
    dispatch(setAlert("Input all fields", 'danger'))
  }
  else{
  if(!(username.match(letters)))
  {
    dispatch(setAlert("Please input alphabet characters only, in username field", 'danger'))
     
  }
  else
  {

  username = username.replace(/[^\w\s]/gi, '')
 let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
   if(password != confirmpassword)
   {
       dispatch(setAlert("your password fields did'nt match", 'danger'))
   }
   else if (!(email.match(themail)))
   {
    dispatch(setAlert("Please input a valid email","danger"))   
   }
   else if(password.length < 8)
   {
       dispatch(setAlert("Your password length should be greater than 8 character","danger"))
   }
   else if(username.length < 3 || username.length > 12)
   {
    dispatch(setAlert("Username length should be between 3 to 12","danger"))
   }
   else 
   {


    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    let name = username;
    const body = {name,email, password};
   try {
      
       const res=   await axios.post('http://127.0.0.1:5000/user/signup',body,config);
      // await axios.post('http://127.0.0.1:5000/review', data)
       console.log(res.data);
       dispatch({
           type : SIGNUP_SUCCESS,
           payload : res.data
       })
      // loaduser();
       window.location.href = 'http://localhost:3000/login'
   } catch (error) {
       // you can get the error//
       // always use response.data so that we can clearly see the error
       console.log(error.response.data);
      dispatch({
          type : LOGIN_FAIL,
          payload : error
      })
     dispatch (setAlert(error.response.data.message,'danger'));
   }
   }
}
  }
} 