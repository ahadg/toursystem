const review = require('../Models/reviewmodel');
const mongoose = require('mongoose');
const Tour = require('../Models/tourmodel');
exports.getallreview = async (req,res) => {
  try {
      const reviews =await review.find();
      res.status(201).json({
          status : "success",
          data : reviews
      })
  } catch (error) {
      console.log(error);
  }
}


exports.like = async(req,res) => {
    try {
        console.log('like')
        const thereview = await review.findById(req.params.id);
        console.log(thereview);
        if (thereview.likes.filter(like => like.user.toString() === req.user).length > 0)
        {
         return res.status(400).json({msg : "post already been liked"})
        }
 
        thereview.likes.unshift({ user : req.user});
        console.log('like2')
        if (thereview.dislikes.filter(dislike => dislike.user.toString() === req.user).length > 0)
        {
           const removeindex = thereview.dislikes.map(dislike => dislike.user.toString()).indexOf(req.user);
 
           thereview.dislikes.splice(removeindex, 1)
     
        }
       
        console.log('like3')
        await thereview.save();
 
        res.json(thereview);
    }
    catch(error)
    {
        console.log(error);
        return res.send('server error');
    }
  }
 
  exports.dislike = async(req,res) => {
     try {
         console.log('dislike')
         const thereview = await review.findById(req.params.id);
         console.log(thereview);
         if (thereview.dislikes.filter(dislike => dislike.user.toString() === req.user).length > 0)
         {
          return res.status(400).json({msg : "post already been disliked"})
         }
  
         thereview.dislikes.unshift({ user : req.user});
       
         if (thereview.likes.filter(like => like.user.toString() === req.user).length > 0)
         {
            const removeindex = thereview.likes.map(like => like.user.toString()).indexOf(req.user);
  
            thereview.likes.splice(removeindex, 1)
      
         }
        
  
       
         await thereview.save();
  
         res.json(thereview);
     }
     catch(error)
     {
         console.log(error);
         return res.send('server error');
     }
   }

exports.createreview = async (req,res) => {
    try {
        console.log('review place')
     //   console.log(req.user);
        req.body.user = req.user;
        let {tour} = req.body;
        console.log(tour);
       // let ntour = tour;
        const newreview = await review.create(req.body);

        const stat = await review.aggregate([
            {
              $match : { tour : mongoose.Types.ObjectId(tour)}
            },
           {
              $group : {
                    // create city
                    _id : '$tour',
                   numreviews : { $sum : 1},
                    avgRating : {$avg: '$rating'}
                }
            
           }
        ])
        console.log(stat);
    await Tour.findByIdAndUpdate(tour, {
        ratingAverage : stat[0].avgRating,
        ratingquantity : stat[0].numreviews
    })

        res.status(201).json({
            status : "success",
      //      data : newreview
        })
    } catch (error) {
        console.log(error);
    }
}