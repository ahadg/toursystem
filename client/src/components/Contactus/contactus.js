import React, { useState } from 'react';
import {connect} from 'react-redux';
import {sendmessage} from '../../_actions/email';
import { ToastContainer, toast } from 'react-toastify';

//import './main.css';



const  Contactus = ({sendmessage}) =>{
   const [email,setemail] = useState('');
   const [name,setname] = useState('');
   const [message, setmessage] = useState('');
   
   let readmessage = (e) => {
       e.preventDefault();
       sendmessage(email,name,message);
   }
 


    return (
    
	<div className="container-contact100">
        <ToastContainer />
    <div className="contact100-map" id="google_map" data-map-x="40.722047" data-map-y="-73.986422" data-pin="images/icons/map-marker.png" data-scrollwhell="0" data-draggable="1"></div>

    <div className="wrap-contact100">
        <span className="contact100-form-symbol">
            <img src="/images/icons/symbol-01.png" alt="SYMBOL-MAIL" />
        </span>

        <form onSubmit={(e)=> readmessage(e)} className="contact100-form validate-form flex-sb flex-w">
            <span className="contact100-form-title">
                Drop Us A Message <br/>
                +92 306 9595997
            </span>

            <div className="wrap-input100 rs1 validate-input" data-validate = "Name is required">
                <input onChange={(e) => setname(e.target.value)} className="input100" type="text" name="name" placeholder="Name" />
                <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 rs1 validate-input" data-validate = "Email is required: e@a.z">
                <input onChange={(e) => setemail(e.target.value)} className="input100" type="email" name="email" placeholder="Email Address" />
                <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate = "Message is required">
                <textarea onChange={(e)=> setmessage(e.target.value)} className="input100" name="message" placeholder="Write Us A Message"></textarea>
                <span className="focus-input100"></span>
            </div>

            <div className="container-contact100-form-btn">
                <button className="contact100-form-btn">
                    Send
                </button>
            </div>
        </form>
    </div>
</div>



    )
}


export default connect(null,{sendmessage})(Contactus);
