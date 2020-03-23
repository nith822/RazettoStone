const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO add schema for flags
const FlagSchema = new Schema({
    userID: {
        type: String,
        required: [true, 'user id is required']
    },
    upvotes:{
        type: int,
        required: [false, 'upvotes field is required']
    }
});


const Flag = mongoose.model('flag', FlagSchema);
module.exports = Flag;
module.exports = FlagSchema;