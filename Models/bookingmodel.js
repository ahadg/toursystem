const mongoose = require('mongoose');

const bookingschema = mongoose.Schema({
    price : {
        type : Number
    },
    seats : {
        type : Number
    },
    date : {
       type : Date,
       default : Date.now()
    },
    tour : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'tour',
        required : [true, "review must belong to tour"]
    },
    user  : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'user',
        required : true
    }

},
{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

// name sould be the name you written in tourmodel.js not in mongodb


module.exports = mongoose.model('booking', bookingschema);