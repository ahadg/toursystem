import {LANDING_PAGE} from '../_actions/types';

const initialstate = {
    landingdata : [],
    loading : true
}

export default function (state = initialstate, action) {
    switch (action.type) {
        case LANDING_PAGE : {
          return {
            ...state,
            landingdata : action.landingdata,
           
            loading : false
          }
        }
        default : return state
    }
}