const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
       required : [true, 'name is required'],
        minlength : [4, 'length should be greater than 6']
    },
    email : {
        type : String,
        required : [true, 'email is required'],
        unique : true
    },
    createdat : {
      type : Date,
      default : Date.now()
    },
    role : {
        type : String,
        default : 'user'
    },
    photo : {
        type : String,
        default : 'default.jpg'
    },
    phone : {
        type : Number
    },
    country : {
        type : String
    },
    
    heart :[
        {
              type: mongoose.Schema.Types.ObjectId,
              // ref name should be same as name define in models //    not the name that stored in mongodb
              ref: 'tour'   
          }
    ],

    password : {
        type : String,
        required : [true, 'password is required'],
        minlength : [8, 'length should be greater than 8']
    }
    ,
    resetpasswordtoken : {
        type : String
    },
    resettokenexpire : {
        type : Date
    }
}
,
{
    toJSON : { virtuals : true},
    toObject : { virtuals : true}
} 
)

// run before when we are trying to save the document
// some method dont work inside 
//userSchema.pre('save',async (next) => {
    userSchema.pre(/^find/,function(next){
        this
        .populate({
            path : 'heart',
          //  select : 'name'
        })
      next();
    })

    userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
    
})

module.exports = User =  mongoose.model('user',userSchema);