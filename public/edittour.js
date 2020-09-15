




$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

 const hidealert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
}
//let s = document.createElement('div');
//s.innerText = 'hi'
//console.log(s);
//console.log(typeof(s))
//document.querySelector('.body').insertAdjacentElement('afterbegin',`<div></div>`);

const showAlert = (status,msg) => {
//  hidealert();
  const markup = ` 
  <div class="container" >
  <div class="malert alert alert-${status}" role="alert">
  ${msg}
</div>
</div>
`;
  document.querySelector('.body').insertAdjacentHTML('afterbegin',markup)

  window.setTimeout(hidealert,5000);
}
let deletetour =async (id) => {
  console.log(id);
  try {
    let res = await axios.post('http://127.0.0.1:5000/dashboardget/deletetour', data = {
      id
    })
    console.log(res.data.msg)
 location.reload();
  } catch (error) {
    showAlert('warning','Error')
  }
}


let ourpics = [];
let guidepic;
// we can store it in some local shit
// this thing is not reload after so we are gonna upload and update picture
// impossible forget it, this aint react

document.querySelector(".uploadguide").addEventListener("change", (e)=> {
  // console.log(e.target.files[0]);
  
 onDropg(e.target.files[0]);
 console.log(ourpics);
 })

 
const onDropg = (files) => {
  // same like in form 
let formData  = new FormData();
const config = {
    header : {'content-type': 'multipart/form-data'}
}
formData.append("file",files)
// console.log(formData);

// its just address to save images in localstorage
// not 
 axios.post('http://127.0.0.1:5000/dashboardview/uploadImage',formData,config)
 .then(response => {
     if(response.data.success) {
      window.createNotification({
        // close on click
     closeOnClick: true,
    
     // displays close button
     displayCloseButton: false,
    
     // nfc-top-left
     // nfc-bottom-right
     // nfc-bottom-left
     positionClass: 'nfc-top-right',
    
     // callback
     onclick: false,
    
     // timeout in milliseconds
     showDuration: 4500,
    
     // success, info, warning, error, and none
     theme: 'success'
     })({
    //   title: 'scary',
       message: "Photo has been uploaded"
     }); 

       // we are getting this function from uploadproductpage
       // and passing new images
       guidepic = (response.data.filename)
       console.log(guidepic);
     }
     else {
       //  alert("Failed to save the images in server")
       window.createNotification({
        // close on click
     closeOnClick: true,
    
     // displays close button
     displayCloseButton: false,
    
     // nfc-top-left
     // nfc-bottom-right
     // nfc-bottom-left
     positionClass: 'nfc-top-right',
    
     // callback
     onclick: false,
    
     // timeout in milliseconds
     showDuration: 4500,
    
     // success, info, warning, error, and none
     theme: 'error'
     })({
    //   title: 'scary',
       message: "Failed to save the images in server, Photo should be in right format"
     });
     }
 })
      

}


document.querySelector(".uploadme").addEventListener("change", (e)=> {
 // console.log(e.target.files[0]);
 
onDrop(e.target.files[0]);
console.log(ourpics);
})


const onDrop = (files) => {
  // same like in form 
let formData  = new FormData();
const config = {
    header : {'content-type': 'multipart/form-data'}
}
formData.append("file",files)
// console.log(formData);

// its just address to save images in localstorage
// not 

 axios.post('http://127.0.0.1:5000/dashboardview/uploadImage',formData,config)
 .then(response => {
     if(response.data.success) {
      window.createNotification({
        // close on click
     closeOnClick: true,
    
     // displays close button
     displayCloseButton: false,
    
     // nfc-top-left
     // nfc-bottom-right
     // nfc-bottom-left
     positionClass: 'nfc-top-right',
    
     // callback
     onclick: false,
    
     // timeout in milliseconds
     showDuration: 4500,
    
     // success, info, warning, error, and none
     theme: 'success'
     })({
    //   title: 'scary',
       message: "Photo has been uploaded"
     });

       // we are getting this function from uploadproductpage
       // and passing new images
       ourpics.push(response.data.filename)
      // console.log(ourpics);
     }
     else {
      //   alert("Failed to save the images in server")
      window.createNotification({
        // close on click
     closeOnClick: true,
    
     // displays close button
     displayCloseButton: false,
    
     // nfc-top-left
     // nfc-bottom-right
     // nfc-bottom-left
     positionClass: 'nfc-top-right',
    
     // callback
     onclick: false,
    
     // timeout in milliseconds
     showDuration: 4500,
    
     // success, info, warning, error, and none
     theme: 'error'
     })({
    //   title: 'scary',
       message: "Failed to save the images in server, Photo should be in right format"
     });
     }
 })
      

}



//alert("hi");
const login2 = async(tourid,name,city,guidegender,startdate,included,depandretrn
  ,expect,seatsavailable,duration,groupsize,price,difficulty,fromp,to
  ,off,tourguidename,minAge,maxAge,guesthouse,hotel,camping,overview,refreshments
  ,guidenumber
  ) => {
   // console.log({email , password})
    try {
      let data = {
       images : ourpics, guidepicture : guidepic,price,name
        ,city,guidegender,startdate,included,depandretrn,expect
        ,seatsavailable,duration,groupsize,price,
        difficulty,fromp,to,off,tourguidename,minAge,maxAge,
        guesthouse,hotel,camping,overview,refreshments,guidenumber
    }
    JSON.stringify(data);
    let mydata = {
      data,
      tourid
    }


     let result = await axios.post('http://127.0.0.1:5000/dashboardget/edittour',mydata);
    console.log(result);
    if((result.data.status) === 'success') {
     // alert('data has successfully Updated');
      window.createNotification({
        // close on click
     closeOnClick: true,
   
     // displays close button
     displayCloseButton: false,
   
     // nfc-top-left
     // nfc-bottom-right
     // nfc-bottom-left
     positionClass: 'nfc-top-right',
   
     // callback
     onclick: false,
   
     // timeout in milliseconds
     showDuration: 4500,
   
     // success, info, warning, error, and none
     theme: 'success'
     })({
    //   title: 'scary',
       message: 'Data has successfully Updated'
     });
    }
      /*
        let xmlhttp = new XMLHttpRequest();
        var url = 'http://127.0.0.1:3000/tour'
        xmlhttp.open("POST",url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({
            name,duration, groupsize,images : ourpics, guidepicture : guidepic,price,difficulty,fromp,to,off,tourguidename,minAge,maxAge,description
        }))
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201)
        {
       //   alert(this.responseText);
       alert("data successfullt addded");
      //  alert(JSON.parse(this.responseText)); 
       // console.log(JSON.parse(this.responseText));
       const data = JSON.parse(this.responseText);
     // console.log(data.status);
  
        }
        else
        {
          console.log(xmlhttp);
          console.log(xmlhttp.responseText);


        }
      //  alert(xmlhttp.responseText);
       // console.log(xmlhttp.responseText.status);
      }
    //    console.log(xmlhttp);
     //   console.log(xmlhttp.responseText);
     */
}
catch (err){
  console.log(err)
  let theerror = err.response.data.data.error.errors;
    console.log(err.response);
    Object.values(theerror).map(function (mval) { 
      //return 
    //  console.log(mval.message) 
     // showAlert('warning', mval.message)
     window.createNotification({
      // close on click
   closeOnClick: true,
  
   // displays close button
   displayCloseButton: false,
  
   // nfc-top-left
   // nfc-bottom-right
   // nfc-bottom-left
   positionClass: 'nfc-top-right',
  
   // callback
   onclick: false,
  
   // timeout in milliseconds
   showDuration: 4500,
  
   // success, info, warning, error, and none
   theme: 'error'
   })({
  //   title: 'scary',
     message: mval.message
   });
    })


}

}


//document.getElementById('thebutton').addEventListener('click', ()=> {
 // alert("hi")
 
//})
console.log('edittour');
//document.getElementById('theform').addEventListener('submit', (e) => {
 // e.preventDefault();
    const updatedata = (val) => {
  //alert("hi");
 // console.log(val);
   

  
 //alert("hi");
 var tourid = val;
 var name = document.getElementById('tourname').value;
 
 var duration = document.getElementById('duration').value;
 console.log(duration);
 var groupsize = document.getElementById('groupsize').value;
 var seatsavailable = groupsize;
 var price = document.getElementById('price').value;

 var difficulty = document.getElementById('difficultytour').value;
 var city = document.getElementById('city').value;
 
 //= document.getElementById('difficultytour').value;
 var fromp = document.getElementById('fromp').value;
 var startdate = document.getElementById('sdate').value;
 console.log(startdate);
 var to = document.getElementById('to').value;
 var off = document.getElementById('off').value;
 var tourguidename = document.getElementById('guidename').value;
 var minAge = document.getElementById('minage').value;
 var maxAge = document.getElementById('maxage').value;
 var guidenumber = document.getElementById('guidenumber').value;
 
 var included = document.getElementById('included').value;
 var depandretrn = document.getElementById('depart').value;
 var expect = document.getElementById('expect').value;
 var guidegender = document.getElementById('guidegender').value;
 var guesthouse = document.getElementById('house').value;
 var hotel = document.getElementById('hotel').value;
 var camping = document.getElementById('camping').value; 
 var overview = document.getElementById('overview').value;

 console.log(document.getElementsByClassName('d1'));
let thecheckbox = document.getElementsByClassName('d1');
let refreshments = [];
//thecheckbox.forEach(el => {
// refreshments = refreshments + el.value + " ";
//});
console.log(refreshments)
for ( let i=0 ; i< 4; i++) 
{
   if (thecheckbox[i].checked)
   {
      // console.log(check[i].value)
       refreshments.push(thecheckbox[i].value);
   }
   
}



 login2(tourid,name,city,guidegender,startdate,included,depandretrn
   ,expect,seatsavailable,duration,groupsize,price,difficulty,fromp,to
   ,off,tourguidename,minAge,maxAge,guesthouse,hotel,camping,overview,refreshments,guidenumber)

}