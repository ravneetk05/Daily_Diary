const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    diary : String,
    date:{
        type:Date
        
    }
});

module.exports = mongoose.model('User', userSchema);
