const mongoose = require('mongoose');

const tourmodel = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'A tour must have a name'],
       
        minlength : [5, "A tour name must be greater than 5"]
    },
    duration : {
      type : Number,
      required : [true, 'A tour must have duration'],
    },
    ratingAverage : {
        type: Number,
        default : 0
    },
    ratingquantity : {
        type : Number,
        default : 0
    },
    tourguidename : {
        type : String
    },
  
    city : {
        type : String,
        required : [true, 'A tour must have a city']
    },
    guidegender : {
        type : String
    },
    guidepicture : {
        type : String
    },
    guidenumber : {
        type : Number
    },
    images: [String],
    minAge:{
        type : Number,
        required : [true, 'A tour must have a min Age']
    },
    maxAge:{
        type : Number,
        required : [true, 'A tour must have a max age']
    },
    groupsize : {
        type : Number,
        required : [true , 'A tour must have group size']
    },
    seatsavailable : {
        type : Number
    },
    difficulty: {
        type: String,
     //   required : [true, 'A tour must have a difficulty']
    },
    travelstyle: {
        type: String
    },
    price : {
        type : Number,
     //   required : [true, 'A tour must have price']
    },
    fromp: {
        type: String,
     //   required : [true, 'A tour must have a location from']
    },
    to : {
        type: String,
     //   required : [true, 'A tour must have a location to']
    },
    off : {
        type : String
    },
    startdate : {
        type : Date
    },
    decription : {
        type : String,
        trim : true
},
included : {
    type : String
},
depandretrn : {
    type : String
},
expect : {
    type : String
},
refreshments : {
    type : Array
},
camping : {
    type : Number,
    dafault : 0
},
hotel : {
    type : Number,
    default : 0
},
guesthouse : {
    type : Number,
    default : 0
},
overview : {
    type : String
}

},

    {
        toJSON : {virtuals : true},
        toObject : {virtuals : true}
    }
)

tourmodel.virtual('reviews', {
    ref : 'reviews',
    foreignField : 'tour',
    localField : '_id'
 })

 //tourmodel.index({
 //    name : 'text',
 //    decription : 'text'
 //}, {
  //   weights : {
  //       name : 5,
   //      decription : 1,
   //  }
 //})

module.exports = tour = mongoose.model('tour',tourmodel);