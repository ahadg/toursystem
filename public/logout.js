console.log('loaded')
let deleteCookie =  async () => {
    console.log('clicked')
    //document.cookie = 'jwt32' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //var d = new Date();
    //d.setTime(d.getTime());
    //var expires = "expires="+d.toUTCString();
    document.cookie = "jwt32=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  //let result = axios.get('/dashboardget/deletecookie')
  //Cookies.remove('jwt32', { path: '/', domain: 'localhost' })
  window.location.href = 'http://localhost:5000/dashboardview/loginme'
}