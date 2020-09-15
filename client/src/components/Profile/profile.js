import React,{useState} from 'react';
import {connect} from 'react-redux';
import {onDrop,updatedata} from '../../_actions/profile';
//import { Link } from '@material-ui/core';
import {Link} from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';


const Profile = ({onDrop,auth,updatedata}) => {

    const [name,setname] = useState();
    const [email,setemail] = useState();
   
    const [country,setcountry] = useState();
    const [phone, setphone] = useState();
    console.log(phone);

    const updatemydata  = (e) => {
        e.preventDefault();
      const data = {
          name,email,phone,country
      }
      updatedata(data);
    }

   const dropme = (e) => {
      
         console.log(e.target.files[0]);
         onDrop(e.target.files[0])
   }

    return (
        
          auth.loaded ?   
        
     <div>
        <div className="left-sidebar">
     
        <div className="scroll-sidebar">
          
            <nav className="sidebar-nav">
                <ul id="sidebarnav">
                    <li> <Link className="waves-effect waves-dark" to="/profile" aria-expanded="false"><i className="fa fa-tachometer"></i><span className="hide-menu">Profile</span></Link>
                    </li>
                    <li> <Link className="waves-effect waves-dark" to="/updatepassword" aria-expanded="false"><i className="fa fa-user-circle-o"></i><span className="hide-menu">Update Password</span></Link>
                    </li>
                    <li>  <Link className="waves-effect waves-dark" to="/mybookings" aria-expanded="false"><i className="fa fa-user-circle-o"></i><span className="hide-menu">My Bookings</span></Link>
                    </li>
                   
                </ul>
              
            </nav>
         
        </div>
     
    </div>
 
    <div className="page-wrapper">
     
        <div className="container-fluid">
          
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">Profile</h3>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li className="breadcrumb-item active">Profile</li>
                    </ol>
                </div>
                <div className="col-md-7 align-self-center">
                    <Link to="/" className="btn waves-effect waves-light btn btn-info pull-right hidden-sm-down"> 
                    Home page</Link>
                </div>
            </div>
         
            <div className="row">
               
                <div className="col-lg-4 col-xlg-3 col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <center className="m-t-30"> <img src={`http://localhost:5000/uploads/${auth.user.photo}`} className="img-circle" width="150" />
                                <h4 className="card-title m-t-10">{auth.user.name}</h4>
                               
     <input onChange={(e)=> dropme(e)} type="file" className="btn waves-effect waves-light btn-info hidden-md-down"/>
                               
                            </center>
                        </div>
                    </div>
                </div>
              
                <div className="col-lg-8 col-xlg-9 col-md-7">
                    <div className="card">
                      
                        <div className="card-body">
                            <form onSubmit={(e)=> updatemydata(e)} className="form-horizontal form-material">
                                <div className="form-group">
                                    <label className="col-md-12">user name</label>
                                    <div className="col-md-12">
                                        <input  onChange={(e) => setname(e.target.value)} type="text" placeholder={auth.user.name} className="form-control form-control-line" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="example-email" className="col-md-12">Email</label>
                                    <div className="col-md-12">
                                        <input onChange={(e) => setemail(e.target.value)} type="email" placeholder={auth.user.email} className="form-control form-control-line" name="example-email" id="example-email"/>
                                    </div>
                                </div>
                               
                                <div className="form-group">
                                    <label className="col-md-12">Phone No (For booking confirmation)</label>
                                 { auth.user.phone ? 
                                <PhoneInput
                                placeholder={auth.user.phone}
                                international
                                value={phone}
                                onChange={setphone}/>
                                :
                                <PhoneInput
      placeholder="Enter phone number"
      international
      value={phone}
      onChange={setphone}/> 
                                }
                                  
                                </div>
                              
                                <div className="form-group">
                                    {  auth.user.country ? 
                                    <div>
                                        <label className="col-sm-12">Country</label>
                                    <div className="col-sm-12">
                                       <h6>{auth.user.country}</h6>
                                    </div>
                                 </div>

                                    : 
                                    <div>
                                    <label className="col-sm-12">Select Country</label>
                                    <div className="col-sm-12">
                                        <select  onChange={(e)=> setcountry(e.target.value)} className="form-control form-control-line">
                                            <option>London</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Usa</option>
                                            <option>Canada</option>
                                            <option>Thailand</option>
                                        </select>
                                    </div>
                                    </div>
                                      }
                                    
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <button className="btn btn-success">Update Profile</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
              
      
     </div>
    </div>
    </div>
    </div> : <p>Loading</p>
    )
}

const mapstatetoprops = (state) => ({
    auth : state.authreducer
  })
export default connect(mapstatetoprops,{onDrop,updatedata})(Profile);