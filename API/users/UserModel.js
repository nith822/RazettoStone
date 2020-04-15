var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    languages: {
        type: Array
    },
    oAuthId: {
        type: String
    }
});
// Export User model
var User = mongoose.model('User', userSchema);
module.exports = User
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}
