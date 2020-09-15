import {ALLHEART,HEART} from '../_actions/types';

const initialstate = {
    heartlist : [],
    loaded : true
}

export default function (state = initialstate, action) {
    switch (action.type) {
        case HEART :
        case ALLHEART :  
        {
        
          return {
            ...state,
           heartlist : action.heartdata,
             loaded: false
          }
        }
        
        default : return state
    }
}