const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO add schema for flags
const FlagSchema = new Schema({
    //userId

    //int flag 
    
});


const Flag = mongoose.model('flag', FlagSchema);
module.exports = Flag;
module.exports = FlagSchema;