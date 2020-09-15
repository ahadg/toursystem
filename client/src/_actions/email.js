import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const sendmessage = (email,name,message) => async dispatch =>  {
  //  console.log('hi')
 //   console.log(data);
    let data = {
        name,
        email,
        message
    }
   
    if(email == "" || name=="" || message=="")
    {
        toast.error('Please input all fields',  {
  
            autoClose: 4000, 
          
        });
 
    }

    var letters = /^[A-Za-z]+$/;
    console.log('hi')
    console.log(data);
    console.log((name.match(letters)))
    if(!(name.match(letters)))
    {
        toast.error('Please input alphabet characters only in name field',  {
  
            autoClose: 4000, 
          
        });

    }
    else {
        let res=
        await axios.post('http://127.0.0.1:5000/user/sendemail', data);
       console.log(res);
       if(res.data.status == 'success')
       {
        toast.success('Message send successfully',  {
  
            autoClose: 4000, 
          
        });

       }
    }
  
    
   
}

export const resetmessage = (email) => async dispatch => {
 //   console.log(email);
  
    try {
        let res = await axios.post('http://127.0.0.1:5000/user/resetmessage',{ email});     
        console.log(res);
        if(res.data.status == 'success'){
        toast.success("Reset password link has been sended to your email, Link will be expired after 10 minutes",  {
  
            autoClose: 100000, 
          
        });
    }
    } catch (error) {
        console.log(error)
        toast.error("Error! Your internet not connected",  {
  
            autoClose: 4000, 
          
        });
    }
   
   

}