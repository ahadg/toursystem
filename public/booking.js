console.log('loaded')
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
    <div class="alert alert-${status}" role="alert">
    ${msg}
  </div>
  </div>
  `;
    document.querySelector('.header').insertAdjacentHTML('afterbegin',markup)

    window.setTimeout(hidealert,5000);
}

let deletebooking =async (bookid) => {
console.log(bookid)
 
 try {
    let res =await axios.post('http://127.0.0.1:5000/dashboardget/deletebooking',data = {
        bookid
    });
     console.log(res.data);
     showAlert(res.data.status, res.data.msg);
 } catch (error) {
     console.log(error)
 }

}

// axios.post('http://127.0.0.1:5000/dashboardget/deletebooking',formData,config)

