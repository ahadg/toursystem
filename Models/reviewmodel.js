const mongoose = require('mongoose');

const reviewschema = mongoose.Schema({
    comment : {
        type: String
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    date : {
       type : Date,
       default : Date.now()
    },
    tour : {
        type : mongoose.Schema.ObjectId,
        ref : 'tour',
        required : [true, "review must belong to tour"]
    },
    user  : {
        type : mongoose.Schema.ObjectId,
        ref : 'user',
        required : true
    },
    likes : [
        {
        user  : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
        }
    ],
    dislikes : [
        {
        user  : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
        }
    ],

},
{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

// name sould be the name you written in tourmodel.js not in mongodb
reviewschema.pre(/^find/, function(next) {
    this.populate({
        path : 'tour'
    })
    .populate({
        path : 'user',
      select :   'name createdat email photo'
    })
    next();
})

module.exports = mongoose.model('reviews', reviewschema);