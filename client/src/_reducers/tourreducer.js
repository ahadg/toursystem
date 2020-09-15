import {GET_TOURS,GET_TOUR,CREATE_COMMENT, GET_BOOKING,REVIEW_LIKEDISLIKE} from '../_actions/types';

const initialstate = {
  tours : [],
  tour : [],
  reviews : [],
  mybookings : [],
  loaded : false,
  tourloaded : false,
  reviewsloaded : false,
  bookingloaded :  false
}

export default function(state = initialstate, action){
    switch (action.type) {
      case GET_BOOKING : {
        return {
          ...state,
          mybookings : action.payload,
          bookingloaded : true
        }
      }
        case GET_TOURS : {
           
            return {
                ...state,
              tours : action.payload,
              loaded : true
            }
        }
        case GET_TOUR : {
          return {
            ...state,
            tour : action.payload,
            reviews : action.payload.reviews,
            loaded : true,
            tourloaded : true,
            reviewsloaded: true
          }
        }
        // if create state apart, than whole state wont reload, 
        case CREATE_COMMENT : {
          return {
          
            ...state,
            reviewsloaded : false,
          //  tour : action.payload,
            reviews : action.payload,
            reviewsloaded : true
          }
        }
      //  case REVIEW_LIKE : {
       //   return {
       //     tour : state.tourreducer.tour.reviews.map(review => review._id === action.payload._id ? {...review, likes : action.payload.dislikes} : review)
       //   }
       // }
        case REVIEW_LIKEDISLIKE : {
          return {
       
            ...state,
          reviews : state.reviews.map(review => review._id === action.payload.id ? {...review,likes :action.payload.tlike, dislikes : action.payload.tdislike} : review),
           reviewsloaded : true
          }
        }
        default : return state
    }
}