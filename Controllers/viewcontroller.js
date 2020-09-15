const tourmodel = require('../Models/tourmodel');


exports.overview = async (req,res) => {
   // console.log(req.body);
     const tours = await tourmodel.find(req.body);
      //  difficulty : 'easy);
   //  console.log(tours);
    // console.log(tour.name);
    res.status(201).render('overview.ejs', {
        tour : tours
    });
}
exports.signin = (req,res) => {
    res.status(201).render('login');
}

