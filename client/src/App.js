import React, {Suspense, useEffect} from 'react';
import { BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Card from './components/Card/card';
import {Provider} from 'react-redux';
import store from './components/store';
import Overview from './components/touroverview/overview';
import Landingpage from './components/Landingpage/landingpage';
import Wishlist from './components/wishlist/wishlist';
import Login from './components/Login/login';
import Alert from './components/Alert/alert';
import {loaduser} from './_actions/auth';
import Privateroute from './components/Privaterouting/privateroute';
import Profile from './components/Profile/profile';
import Updatepassword from './components/Profile/password';
import Signup from './components/signup/signup';
import Contactus from './components/Contactus/contactus';
import Bookings from './components/booking/booking';





const App = () => {
 
    useEffect(() => {
      store.dispatch(loaduser());
    },
    // run only once, so brackets
    []);

 
 let nothing;
 const getvalues =(values) => {
  // calleme(values);
 // let values;
  console.log(values);
}
//console.log(nothing);
  return (
   <Provider store={store}>
    <Router>
     <Navbar searchedvalue = {values=> getvalues(values)}
     searchfield={values=> getvalues(values)}
     />
    <Alert />
        
    <Switch>
    <Route exact path="/contactus" component={Contactus} />
    <Route exact path="/signup" component={Signup} />
    <Privateroute exact path="/updatepassword" component={Updatepassword} />
    <Route exact path="/login" component={Login} />
    <Privateroute exact path="/wishlist" component={Wishlist} />
    <Route exact path="/" component={Landingpage} />
    <Privateroute exact path="/profile" component={Profile} />
    <Privateroute exact path="/bookedsaving" />
     <Route  exact path="/card"
     // to pass props in routes component you have to use render
  // render={()=> <Card search={nothing} />}  />
         component={Card} />
         <Privateroute exact path="/mybookings" component={Bookings} />
     <Privateroute exact path="/overview/:id" component={Overview} />
    </Switch>
   
  
    </Router>
    </Provider>
  )
}

export default App;
