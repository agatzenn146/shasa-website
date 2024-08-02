const mongoose = require('mongoose');


mongoose.set('strictQuery', false);

// Connecting to mongodb database
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true})

.then(()=>console.log('CONNECTED TO DB...'))
.catch(err => console.log(err));


require('./events');

