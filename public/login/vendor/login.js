//import {showAlert} from './alert';

 const hidealert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
}

 const showAlert = (type,msg) => {
  hidealert();
  const markup = `<div class"alert alert-${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin',markup);
  window.setTimeout(hidealert,5000);
}
//alert("hii");
document.getElementById("hi2").addEventListener('onClick', () => {
  alert("you just clicked");
})


// axios for http request,   create cookies and all that stuff
const login4 = async(email,password) => {
    console.log({email , password})
    try {
    const res = await axios({
    withCredentials : true,
        method : 'POST',
        url : 'http://127.0.0.1:3000/user/signin',
        data : {
            email, password
        }
       });
   console.log(res);
   console.log(res.data.status);
   if (res.data.status === 'success')
   {
    showAlert('success',"Logged in successfully");
    window.setTimeout(()=>{
      location.assign('/overview');
    },1500);
   }

  }
catch (err){
  //console.log(err);
    alert(err.response.data.message);
}
}



document.querySelector('#form').addEventListener('submit', e => {
    e.preventDefault();
   // alert("submitted");
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  //  setkaro();
    login4(email,password);
   
})