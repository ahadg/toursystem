console.log('loaded')


const hidealert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  }
  
   const showAlert = (type,msg) => {
    hidealert();
    const markup = `<div class="alert alert-${type}" role="alert">
 ${msg}
</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin',markup);
    window.setTimeout(hidealert,5000);
  }
  //alert("hii");
  

let callme = async (resettoken) => {
    
    console.log('resettoken')
    console.log(resettoken);
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('confirmpassword').value;
    console.log(resettoken,password,cpassword)
    if(!password || !cpassword) {
     //   alert("input all fields");
  showAlert('danger','input all fields')
        return;
    }
    else if (password.length < 8)
    {
      showAlert('danger','your password length should be greater than 7')
      return;
    }
   else if( password != cpassword) {
      //  alert('your password didnt matched');
      showAlert('danger','your password didnt matched')
        return;
    }
    let mydata = {
        resettoken,
        password,
        cpassword
    }
  try {
     let result = await axios.post('http://127.0.0.1:5000/user/resetupdatepassword',mydata);
    showAlert('success',"Password Updated");
   
        window.location.href = 'http://127.0.0.1:3000/login'
    
  console.log(result);   
  } catch (error) {
    showAlert('danger','Error')
  }
   
}


