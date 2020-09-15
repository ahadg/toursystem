

let manusers =async (value,id) => {
console.log(value,id)
 
 try {
    let res =await axios.post('http://127.0.0.1:5000/dashboardget/muser',data = {
        value, id
    });
     console.log(res);

   //  showAlert(res.data.status, res.data.msg);
   if(res.data.status == "success")
   {
location.reload();
   }
 } catch (error) {
     console.log(error)
 }

}

// axios.post('http://127.0.0.1:5000/dashboardget/deletebooking',formData,config)

