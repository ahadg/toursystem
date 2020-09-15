import {CREATE_COMMENT,SET_ALERT,GET_USER} from './types';
import axios from 'axios';
import {loaduser} from './auth';
import {setAlert} from './setalert';


export const updatepassword = (currentpassword,newpassword,confirmpassword) => async dispatch => {
    if(!currentpassword || !newpassword || !confirmpassword)
    {
        dispatch(setAlert('please fill fields', 'danger'))
    }
    else {
    if(newpassword === confirmpassword)
      {
          try {
            //  let userid = "5eac9b23da9d2912ec31fdce";
              const data = {
              //    userid,
                  currentpassword,
                  newpassword
              }
              const res = await axios.post('http://127.0.0.1:5000/user/updatepassword',data)
             // console.log(res);
             // console.log(res.data.newuser);
             // dispatch({
             //     type : GET_USER,
             //     payload : res.data.newuser
             // })
              if(res.data.status === 'success')
              {
                  dispatch(setAlert("Password updated", 'success'))
              }
          } catch (error) {
              console.log(error.response.data)
              dispatch(setAlert(error.response.data.msg, 'danger'))
          }
      }
      else {
        //  console.log('didnt matched')
          dispatch(setAlert('your new and confirmed password didnt matched', 'danger'))
      }

    }
  
}

export const updatedata = (data) => async dispatch => {
   try {
       console.log('here')
              const res = await axios.post('http://127.0.0.1:5000/user/updatedata',data)
              console.log(res);
              console.log(res.data.data.users);
              dispatch({
                  type : GET_USER,
                  payload : res.data.data.users
              })
                dispatch(loaduser());
              if(res.data.status === 'success'){
                  dispatch(setAlert('Data has been updated', 'success'))
              }
          } catch (error) {
              console.log(error.response)
              dispatch(setAlert(error.response.data.msg, 'danger'))
          }
      }

      export const updatepic = (picname) => async dispatch => {
        try {
            console.log('here')
            let data = {
                photo : picname
            }
                   const res = await axios.post('http://127.0.0.1:5000/user/updatedata',data)
                   console.log(res);
                   console.log(res.data.data.users);
                   dispatch({
                       type : GET_USER,
                       payload : res.data.data.users
                   })
                   dispatch(loaduser());
               } catch (error) {
                   console.log(error.response)
                   dispatch(setAlert(error.response, 'danger'))
               }
           }
     


let ourpics =[];

 export const onDrop =   (files)  => async dispatch =>{
        // same like in form 
        console.log(files)
      let formData  = new FormData();
      const config = {
          header : {'content-type': 'multipart/form-data'}
      }
      formData.append("file",files)
     //  console.log(formData);
      
      // its just address to save images in localstorage
      // not 
      try {
      const res = await  axios.post('http://127.0.0.1:5000/dashboardview/uploadImage',formData,config)
      ourpics.push(res.data.filename)
             console.log(res.data.filename)
             dispatch(updatepic(res.data.filename));
             dispatch(setAlert('Image has been updated', 'success'))
    } catch (error) {
        dispatch(setAlert('Failed to save image', 'danger'))
      }
    //   axios.post('http://127.0.0.1:5000/dashboardview/uploadImage',formData,config)
      // .then(response => {
        //   if(response.data.success) {
             
      
             // we are getting this function from uploadproductpage
             // and passing new images
         //    ourpics.push(response.data.filename)
          //   console.log(response.data.filename)
            // dispatch(updatepic(response.data.filename));
          // }
           //else {
            //   alert("Failed to save the images in server")
          // }
      // })
            
      
      }
    
    

