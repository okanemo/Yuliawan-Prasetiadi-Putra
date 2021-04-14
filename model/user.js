const moongose = require('mongoose')

//Schema to create user
const userSchema = new moongose.Schema({
    name: String,
    userName: String,
    totalUnit: moongose.Decimal128,
});

//Export User Model
exports.User = moongose.model('User', userSchema);