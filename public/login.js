console.log('thelogin')
const loginme =async () => {
    //e.preventDefault();
  let email = document.getElementById('email').value;
   let mpassword = document.getElementById('pass').value;
   let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!email || !mpassword)
{
    console.log('no')
    $.notify({
        clickToHide: false,
        // options
        message: "Please input all fields"
    },{
        // settings
        type: 'warning'
    });
    return
   
}


  
 
   else if (!(email.match(themail)))
   {
    $.notify({
        clickToHide: false,
        // options
        message: "Input a valid email"
    },{
        // settings
        type: 'warning'
    });
    return
   }
   let body = {
    email,mpassword
}

   let result =await axios.post('/dashboardget/checklogin', {
     body
   });
   console.log(result)
   if(result.data.status == "Error")
   {
    $.notify({
     //    options
        message: result.data.msg
    },{
        // settings
        type: 'danger'
    });
   }
   else 
   {
       window.location = '/dashboardview/dashboard'
   }
}