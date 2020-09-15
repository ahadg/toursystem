import React, { useState } from 'react';
import { MDBInput ,  MDBFormInline} from 'mdbreact';
import {Checkbox,Collapse} from 'antd';
//import { OmitProps } from 'antd/lib/transfer/renderListBody';
const {Panel} = Collapse;
const continents = [
{
    "_id":1,
    "name" : "Multan"
},
{"_id" : 2, "name" : "Lahore"},
    {"_id" : 3, "name" : "Karachi"},
    {"_id" : 4, "name" : "Islamabad"},
    {"_id" : 5, "name" : "Peshawar"},
    {"_id" : 6, "name" : "Rawalpindi"},
    {"_id" : 7, "name" : "Faisalabad"},
    {"_id" : 8, "name" : "Gujranwala"},
    {"_id" : 9, "name" : "Sargodha"},
    {"_id" : 10, "name" : "Abbottabad"},
    {"_id" : 11, "name" : "Gilgit"},
    {"_id" : 12, "name" : "Kashmir"},


]




function CheckBox(props){

    const [checked,setchecked] = useState([]);


 /*const   handlechecked = (id) => {
     console.log(id);
       const checking = checked.indexOf(id);
       const newchecked = [...checked];

       if (checking === -1)
       {
           newchecked.push(id);
           
       }
       else {
           newchecked.splice(checking,1);
       }
       setchecked(newchecked);
       console.log(checked);
       
     

   } */
   
   const handleToggle = (value) => {
    const currentIndex =checked.indexOf(value);
    const newChecked = [...checked];

    if(currentIndex === -1){
        newChecked.push(value)
    } else {
        newChecked.splice(currentIndex, 1)
    }
    setchecked(newChecked )
    props.handlefactor(newChecked);
    //console.log(checked);
  //  props.handleFilter(newChecked)
}

    return (
        <div>
       
       
        <MDBFormInline>
        {continents.map((value,index)=> (
            <React.Fragment key={index}>
           
             <MDBInput
             onChange={()=> handleToggle(value.name)}  
          label={value.name}
          type='checkbox'
          id={index}
          containerClass='mr-3'
        />  
          
             
            </React.Fragment>
            
        ))}
        </MDBFormInline>
      
      
      
     
      
        
        </div>

    )
}


export default CheckBox;
