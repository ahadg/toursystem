import React,{useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {onDrop} from '../../_actions/profile';
import {updatepassword} from  '../../_actions/profile';


const Mpassword = ({updatepassword}) => {

 
    const [oldpassword,setoldpassword] = useState();
    const [newpassword,setnewpassword] = useState();
    const [confirmpassword,setconfirmpassword] = useState();
   

    const updatepass  = (e) => {
        e.preventDefault();
        
   updatepassword(oldpassword,newpassword,confirmpassword)
    }

 

    return (
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
                    <h3 className="text-themecolor">Update Password</h3>
                   
                </div>
               
            </div>
         
            <div className="row">
               
             
              
                <div className="col-lg-8 col-xlg-9 col-md-7">
                    <div className="card">
                      
                        <div className="card-body">
                            <form onSubmit={(e)=> updatepass(e)} className="form-horizontal form-material">
                               <div className="form-group">
                            <label className="col-md-12">Old Password</label>
                            <div className="col-md-12">
                                <input onChange={(e)=> setoldpassword(e.target.value)} type="password"  className="form-control form-control-line" />
                                </div>
                                </div>
                                <div className="form-group">
                                <label className="col-md-12">New Password</label>
                                <div className="col-md-12">
                                    <input onChange={(e) => setnewpassword(e.target.value)} type="password" className="form-control form-control-line" />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label className="col-md-12">Confirm Password</label>
                                    <div className="col-md-12">
                                        <input onChange={(e) => setconfirmpassword(e.target.value)} type="password"  className="form-control form-control-line" />
                                        </div>
                                        </div>
                               
                               
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <button className="btn btn-success">Update Password</button>
                                    </div>
                                </div>
                            </form>
                            <form>
                            
                            </form>
                        </div>
                    </div>
                </div>
              
      
     </div>
    </div>
    </div>
    </div>
    )
}

export default connect(null,{updatepassword})(Mpassword);