import React, {useState, useReducer} from 'react';
import {connect,Link} from 'react-redux';
import {signup} from '../../_actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = ({signup}) => {
    



    const [data, setdata] = useState({
        username : '',
        email : '',
        password : '',
        confirmpassword : ''
    });
    const onchange = (e) => {
       
        setdata({
            ...data,
            [e.target.name] : e.target.value
          //  [e.target.name] : [e.target.value]
        })
    }
    const {username,email,password,confirmpassword} = data;

    const onsubmit = (e) => {
       e.preventDefault();
      console.log(confirmpassword);
       console.log(password)
     
       signup(username,email,password,confirmpassword);
    }

    return (
       <div>
       <div className="limiter">
       <div className="container-login100">
           <div className="wrap-login100">
           <ToastContainer />
               <form className="login100-form validate-form" onSubmit={e => onsubmit(e)}>
                   <span className="login100-form-title p-b-34">
                       Account Signup
                   </span>
                   <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                   <input  onChange={(e) => onchange(e)} className="input100" type="text" name="username" placeholder="username"/>
                   <span className="focus-input100"></span>
               </div>
                   <div className="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
                       <input onChange={(e) => onchange(e)} id="first-name" className="input100" type="email" name="email" placeholder="email"/>
                       <span className="focus-input100"></span>
                   </div>
                   <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                       <input  onChange={(e) => onchange(e)} className="input100" type="password" name="password" placeholder="Password"/>
                       <span className="focus-input100"></span>
                   </div>
                   <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                   <input  onChange={(e) => onchange(e)} className="input100" type="password" name="confirmpassword" placeholder=" Confirm Password"/>
                   <span className="focus-input100"></span>
               </div>
                   
                   <div className="container-login100-form-btn">
                       <button className="login100-form-btn">
                           Sign Up
                       </button>
                   </div>

                  
               </form>

               <div className="login100-more" style={{'backgroundImage': 'url(/Login_v17/images/bg-01.jpg)'}}></div>
           </div>
       </div>
   </div>
       </div>
    )

    
}

export default connect(null,{signup})(Signup);