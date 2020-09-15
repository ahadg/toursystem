import React,{useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import getalltours from '../../_actions/gettours';
//import {Icon} from 'semantic-ui-react';
import { Button, Icon, Label } from 'semantic-ui-react';
import {MDBBtn ,MDBCol, MDBIcon,  MDBCloseIcon } from "mdbreact";

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SettingsIcon from '@material-ui/icons/Settings';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form'


const NavBar  = ({searchedvalue,auth,getalltours,history}) => {
 
  let logout = () => {
    localStorage.removeItem('thetokenx');
  
  }

    return (
        <div>






        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" style={{'color': 'rgba(0,0,0,0.5)'}}>
        <Link to="/" style={{'textDecoration': 'none', 'color':'rgba(0,0,0,0.5)','fontSize': '25px'}}>pakwalker</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
           
          </Nav>
          <Form inline>
          <li className="nav-item ">

          <Link to="/contactus" role="button">
          <ContactSupportIcon style={{'fontSize' : '25px','color': 'rgba(0,0,0,0.5)'}}/>
          </Link>
      </li>
          <li className="nav-item ">

          <Link to="/wishlist" role="button">
          <FavoriteBorderIcon style={{'fontSize' : '25px','color': 'rgba(0,0,0,0.5)','marginLeft': '25px'}}  />
          </Link>
      </li>
          {
            (auth.isAuthenticated) ?  
            <React.Fragment>
            <button  style={{'marginLeft': '25px'}} className="btn btn-outline-secondary" onClick={logout} href="#" role="button">Log out</button>
           
     
        
       
       
      
           
             <img style={{'marginLeft': '25px',width : '35px',height : '35px',borderRadius : '50%'}} src={`http://localhost:5000/uploads/${auth.user.photo}`} alt="user" className="" /> 
            <span className="hidden-md-down">{auth.user.name}&nbsp;</span> 
           <Link to="/profile">  <span className="hidden-md-down"><SettingsIcon
           style={{'fontSize' : '25px','color': 'rgba(0,0,0,0.5)','marginLeft': '27px'}} 
           /></span> </Link> 
       
        </React.Fragment> :
        <React.Fragment>
                  <li className="nav-item">
                  <Link style={{'marginLeft': '25px'}} to="/Login" className="btn btn-outline-secondary" >Log in</Link>
                  
                  </li>
                  <li className="nav-item">
                    <Link style={{'marginLeft': '25px'}} to="/signup" className="btn btn-secondary" >Signup</Link>
                  </li>
            </React.Fragment>
            }
            
          </Form>
        </Navbar.Collapse>
      </Navbar>


        </div>
    )
}
const mapstatetoprops = (state) => ({
  auth : state.authreducer
})

export default connect(mapstatetoprops,{getalltours})(NavBar);