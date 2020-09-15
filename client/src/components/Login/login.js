import React, {useState, useReducer} from 'react';
import {connect} from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import {login,initialdata} from '../../_actions/auth';
import {resetmessage} from '../../_actions/email';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Login = ({userexistance,login,initialdata,history,resetmessage}) => {
    



    //const [data, setdata] = useState({
    //    email : '',
      //  password : ''
    //});
    const [email,setemail] = useState('');
    const [pass,setpass] = useState('');
    const findemail = (e) => {
        setemail(e.target.value);
        initialdata(e.target.value);
    }
  //  const onchange = (e) => {
        
    //    setdata({
     //       ...data,
      //      [e.target.name] : e.target.value
          //  [e.target.name] : [e.target.value]
      //  })
    //}
   // const {email,password} = data;

    const onsubmit = (e) => {
       e.preventDefault();
      console.log(email);
       console.log(pass)
       login(email,pass);
    }

    return (

        userexistance.loaded ? 
        
      (  userexistance.isAuthenticated ? 
        
           <Redirect to="/" />
         :
       <div>
       <div className="limiter">
  <ToastContainer />

       <div className="container-login100">
           <div className="wrap-login100">
               <form className="login100-form validate-form" onSubmit={e => onsubmit(e)}>
           {  userexistance.emailverify ?
            <div> 
               <span class="login100-form-logo">
					<img class="img22" src={`http://localhost:5000/uploads/${userexistance.user.existuser.photo}`}/>
					</span>  
               <span className="login100-form-title p-b-34 p-t-27">
                   WELCOME <br/>    {userexistance.user.existuser.name}
                   </span>
                   </div>
                   :  <span className="login100-form-title p-b-34 p-t-27">
                   Account Login
               </span>
           }
                   
                   <div className="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
                       <input onChange={(e) => findemail(e)} id="first-name" className="input100" type="email" name="email" placeholder="email"/>
                       <span className="focus-input100"></span>
                   </div>
                   <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                       <input   onChange={(e) => setpass(e.target.value)} className="input100" type="password" name="password" placeholder="Password"/>
                       <span className="focus-input100"></span>
                   </div>
                   
                   <div className="container-login100-form-btn">
                       <button className="login100-form-btn">
                           Sign in
                       </button>
                   </div>
                   <div className="w-full text-center">
                   <div class="text-center p-t-90">
                   { userexistance.emailverify ? 
                    <a class="txt1" href="#" onClick={() => resetmessage(email)} >
                    Forgot Password?
                </a>   : 
                <a class="txt1" href="#">
             
                SIGN UP
            </a>
                   }
                   </div>
                   </div>
                  
               </form>

               <div className="login100-more" style={{'backgroundImage': 'url(/Login_v17/images/bg-01.jpg)'}}></div>
           </div>
       </div>
   </div>
   
       </div>
      ) : <p>Loading</p>
    )

    
}

const  mapstatetoprop = state => ({
    userexistance : state.authreducer,
    
})


export default connect(mapstatetoprop,{login,resetmessage,initialdata})(Login);