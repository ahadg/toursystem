import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'


// if we use perenthesis in a function, they expect single statement i think, also no return etc
// so use curly braces so can return different expressions
const Privateroute = ({component  : Component , auth : {isAuthenticated,loaded},...rest}) => {
  


  return (

  <Route {...rest} render={props => {
    if(loaded) {
     // alert(loaded)
     // alert(isAuthenticated)
      if(isAuthenticated)
      {
        return <Component {...props}/>
      }
      else 
      {
      return  <Redirect to="/login"/> 
      }
    
    }
    
    

  }
  
//!loaded && !isAuthenticated  ?
 //   <Redirect to="/login"/>
   //                                    : (<Component {...props}/>  
   }
  
   />
  )



  }

Privateroute.propTypes = {
  auth : PropTypes.object.isRequired
} 


const mapoutstatetoprops = state => ({
    auth : state.authreducer
});

export default connect(mapoutstatetoprops)(Privateroute);