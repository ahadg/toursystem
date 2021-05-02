const tourmodel = require('../Models/tourmodel');


exports.overview = async (req,res) => {
     const tours = await tourmodel.find(req.body);
    res.status(201).render('overview.ejs', {
        tour : tours
    });
}
exports.signin = (req,res) => {
    res.status(201).render('login');
}

