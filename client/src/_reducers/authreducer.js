import {LOGIN_SUCCESS,LOGIN_FAIL,GET_USER,AUTHENTICATION_FAIL,SIGNUP_SUCCESS,INITIAL_DATA} from '../_actions/types';

const initialstates  = {
    token : localStorage.getItem('token'),
    isAuthenticated : null,
    loaded : false,
    emailverify : false,
    user : null
}

export default function(state = initialstates, action) {
    switch(action.type) {
        case LOGIN_SUCCESS : 
        case SIGNUP_SUCCESS :
        {
            localStorage.setItem('thetokenx', action.payload.token)
            return {
                ...state,
               
                token : action.payload.token,
               

            }
        }
        case INITIAL_DATA : {
            return {
            ...state,
            emailverify : true,
            user : action.payload
            }
        }
            case GET_USER : {
              return {
                  ...state,
                  user : action.payload,
                  isAuthenticated : true,
                  loaded : true,
                
              }
            }
            case LOGIN_FAIL :
            case AUTHENTICATION_FAIL :    
            {
                return {
                    ...state,
                    isAuthenticated : false,
                    loaded : true
                }
            }
    default : return state;
    }
}
