
const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
    name : {type:String,
        required: true,
    },
    
    evdate: {
        type: String,
        required:'this field is required'
    },
      
    
    time : {
        type: String,
        required :'this field is required'
    },

    image:{
        type: String
    },
    
    description:{
        type: String
    },

    date:{
        type: Date,
        default : Date.now,
    },
   
});


module.exports = mongoose.model('Event',eventSchema);