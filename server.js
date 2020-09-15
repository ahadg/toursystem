const mongoose  = require('mongoose');

mongoose.connect("mongodb+srv://root:ahad1234@mycluster.ruutg.mongodb.net/toursystem?retryWrites=true&w=majority")
.then(console.log('Connection was successful'));
