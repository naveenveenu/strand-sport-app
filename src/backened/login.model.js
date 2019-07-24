const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Login = new Schema({
    UserName: {
        type: String
    },
    Email: {
      type: String
    },
});
module.exports = mongoose.model('Login', Login);
