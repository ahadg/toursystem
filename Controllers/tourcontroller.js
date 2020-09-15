const tourmodel = require('../Models/tourmodel');
const User = require('../Models/ussermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.searchdata = async (req, res) => {
    try {
      //  console.log(req.query);
      //  console.log('searching')
        const tours = await tourmodel.find(req.query);
        
        res.status(200).json({
            status : 'success',
            tours
            
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getlandingdata = async (req,res) => {
try {
    // we got our top 8 with price    tours 

 const tours = await tourmodel.find().sort('-ratingAverage')
 .sort('price').limit(8);
   
   
   
    // const multan = await tourmodel.find({
     //   name : 'multan'
    //});


    // this is our aggregation pipleline amazing, read documentation
    // we got top 8 cities which are getting highest avgrating
    // loop till 8
    const stats = await tourmodel.aggregate([
        
            {
            $group : {
                // create city
                _id : '$name',
                numTours : { $sum : 1},
                avgRating : {$avg: '$ratingAverage'}
            }
        
        },
        {
            $sort : { avgRating : -1}
        }
    ])
    const citystats = await tourmodel.aggregate([
        
        {
        $group : {
            // create city
            _id : '$city',
            numTours : { $sum : 1},
            avgRating : {$avg: '$ratingAverage'}
        }
    
    },
    {
        $sort : { avgRating : -1}
    }
])
const totalstats = await tourmodel.aggregate([
        
    {
    $group : {
        // create city
        _id : null,
        numTours : { $sum : 1},
        avgRating : {$avg: '$ratingAverage'}
    }

}
])
console.log(totalstats)
    res.status(200).json({
        status : 'success',
        tours,
        stats,
        citystats,
        totalstats
        
    })
} catch (error) {
    console.log(error);
}


}


exports.createtour = async (req,res) => {
    // as soon as it will recieve error , move out from try block and move to catah
 try {
    const newtour = await tourmodel.create(req.body);
    res.status(201).json({
        status : 'success',
        data : {
            newtour
        }
    })
 } catch (error) {
    
     console.log(error);
    res.json({
        error : "error"
    })
    }
  
}

exports.getall = async (req,res) => {
    
    console.log(req.body);
 //   console.log(req.body.skip)
 //  console.log('hiii');
    try {
        let findArgs = {};
        let tourss;
        let alltours;
        if(req.body.filter) {
            console.log("inside looop")
           
        for(let key in req.body.filter) {
            // and json have key and value, in filters we have two keys , continents and prices
            if(req.body.filter[key].length > 0) {
                if(key=== "price") {
               findArgs[key] = {
                   $gte : req.body.filter[key][0],
                   $lte : req.body.filter[key][1]
               }
                }
                else {
                    
                    findArgs[key] = req.body.filter[key];
                    console.log('city')
                    console.log( req.body.filter[key])
        
                }
            }
           
            console.log(findArgs);
        }
        alltours  = await tourmodel.find(findArgs);
        tourss = await tourmodel.find(findArgs);
        //.limit(req.body.limit).skip(req.body.skip);
      
    }
    else if (req.body.searchterm) {
        const searchval = req.body.searchterm;
        function titleCase(string) {
            var sentence = string.toLowerCase().split(" ");
            for(var i = 0; i< sentence.length; i++){
               sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
            }
         sentence.join(" ");
         return sentence;
         }
        let newval =  titleCase(searchval)
        if(searchval){
          //  alltours = await tourmodel.find({$text : {$search  : searchval}}); 
          alltours = await tourmodel.find({
            name : {$regex : new RegExp(newval)}  
         //   {$text : {$search  : searchval}
        } ); 
        //    tourss =  await tourmodel.find({$text : {$search  : searchval}})
            //.limit(req.body.limit).skip(req.body.skip);
            tourss = await tourmodel.find({
                name : {$regex : new RegExp(newval)}  
             //   {$text : {$search  : searchval}
            } ); 
        }    
    }
    else if (req.body.result) {
      //  alltours = await tourmodel.find(req.body.result)
      alltours = [];
      console.log('testing') 
     // console.log(req.body.result.city[0].toUpperCase())
     let sentence = [];
  sentence =   req.body.result.city ;
  let ncity;
     // for(var i = 0; i< req.body.result.city.length; i++){
        if(sentence !== '')
        {
            function titleCase(string) {
                var sentence = string.toLowerCase().split(" ");
                for(var i = 0; i< sentence.length; i++){
                   sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
                }
             sentence.join(" ");
             return sentence;
             }
             ncity =  titleCase(sentence);
             req.body.result.city = ncity;
        }
        
        
    // }
  
   //  console.log(sentence)
      tourss = await tourmodel.find(req.body.result)
      //.limit(req.body.limit).skip(req.body.skip);
    }
    else {
       alltours =  await tourmodel.find(req.body);
        tourss = await tourmodel.find(req.body);
    }
  //  console.log('hi');
 //   console.log(req.body);
   //    console.log(req.body.searchterm);
       
        
           
        
        
            //  difficulty : 'easy'
           // req.body
        //   );
         //  console.log(tourss);
          // console.log(tour.name);
        //  res.status(201).render('overview.ejs', {
          //    tour : tourss
          //});
          let tourlength = alltours.length;
          res.status(200).json({
            status : 'success',
              tours : {  tourlength,
                         tourss}
            
        })
    } catch (error) {
        res.status(404).json({
            error
        })
        console.log(error);
    }
}

exports.getallhearttest = async (req,res) => {
    console.log("you reached heart");
    console.log(req.user);
    try {
        const user = await User.findById(req.user)
      //  .populate('heart');
        res.status(200).json({
            user
        })


    } catch (error) {
        res.status(404).json({
            msg : error
        })
    }
}


exports.heart  = async (req,res) => {
  //  console.log("you reached heart");
    console.log(req.user);
    console.log(req.body);
    try {
        const user = await User.findById(req.user);
        if(!user) 
      {
          res.status(404).json({
              msg : 'no user found'
          })
      }
      let newheart ;
    //  console.log(user);
    //  console.log(user.heart);
      //console.log("iddd")
     // console.log(user.heart[0]._id.toString());
    //  if(user.heart.includes(req.body.tourid))
  //  if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) 
  if (user.heart.filter(aheart => aheart._id.toString() === req.body.tourid).length > 0)  
  {
         
      newheart = user.heart.filter(heartt => heartt._id.toString() !== req.body.tourid);
      console.log('if');
      console.log(newheart);
      user.heart = newheart;
      }
      else 
      {
          console.log('else')
       user.heart.push(req.body.tourid);
      }
      await user.save()
      //.populate('heart');
      let newuser = await User.findById(req.user);
      //.populate('heart');
      res.status(200).json({
       newuser
    })
    } catch (error) {
        res.status(404).json({
            msg : error
        })
        
    }
}

exports.updatatour = async (req,res) => {
    try {
        const tour = await tourmodel.findByIdAndUpdate(req.params.id,req.body);
        res.status(201).json({
            status : 'success',
            data : {
                tour
            }
        })
    } catch (error) {
        console.log(error);
    }
}
exports.getatour = async (req,res) => {
    try {
        const tour = await tourmodel.findById(req.params.id).populate('reviews');
      // const tour2 = await tourmodel.findOne({city : 'multan',startdate : '2020-05-14'});
       // console.log('tourrrrrr22222222222222');
       // console.log(tour2);
        res.status(201).json({
            status : 'success',
             tour
            
        })
    } catch (error) {
        console.log(error);
    }
}

