const moongoose = require('mongoose');

const userSchema = moongoose.Schema({
    nams : {
        type: String,
        maxlength: 50
    },
    email : {
        type: String,
        trime:true,
        unique : 1
    },
    password : {
        type : String,
        maxlength: 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp:{
        type : Number
    }

})

const User = moongoose.model('User',userSchema)

module.exports = {User}
