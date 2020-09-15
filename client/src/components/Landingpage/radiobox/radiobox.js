import React, {useState} from 'react';
//import { View } from 'react-native';
//import { RadioButton } from 'react-native-paper';
//import RadioGroup from 'react-radio-buttons';
import { MDBContainer, MDBInput,MDBFormInline } from "mdbreact";
import {Collapse} from 'antd';
import { OmitProps } from 'antd/lib/transfer/renderListBody';
const {Panel} = Collapse;




const price = [
    {
        "_id":13,
        "name":"Any",
        "array" : []
    },
    {
        "_id":14,
        "name":"0 to 2000",
        "array" : [0,2000]
    },
    {
        "_id":15,
        "name":"2000 to 3000",
        "array" : [2000,3000]
    },
    {
        "_id":16,
        "name":"3000 to 4000",
        "array" : [3000,4000]
    },
     {
        "_id":17,
        "name":"4000 to 50000",
        "array" : [4000,50000]
    },
    {
        "_id":18,
        "name":"more than 50000",
        "array" : [50000,10000000]
    }
]



function RadioBox(props){

const [value,setValue] = useState(0);
const [val, onClick] = useState(0);

  // console.log(val);

    const handleChange = (vall) => {
    //   setValue(e.target.value); 
//    console.log(vall);
    props.handlefactor(vall);
    }

    return(
        <div>
       
      
        <div className="form-check">
        
        <MDBFormInline>
       { price.map((value)=> (
          
         
           <MDBInput


           /// its id was matching with checkbox id, also changing was changing its values..
           
          onChange= {()=>handleChange(value.array)}
             onClick={() =>onClick(value._id)}
             checked={val === value._id ? true : false}
          // checked = 'true'
             label={value.name}
             type='radio'
             id={value._id}
             containerClass='mr-3'
           />
          
     
           
        
        )) }
        </MDBFormInline>
  
      
       
     
   <input type="radio" value="option1" checked={true} />
         
       
      </div>
       
        </div>
    )
}

export default RadioBox;