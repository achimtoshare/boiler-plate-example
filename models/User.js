const moongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken');

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
        maxlength: 100
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



userSchema.pre('save',function(next){
    //비밀번호를 암호화시킨다 
    var user = this;

    //비밀번호를 바꿀때만 암호화해야하므로 유효성 설정
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err)
                user.password = hash
                next() //save로 돌아감
            })
        })
    }else{
        next()
    }

})
userSchema.methods.comparePassword = function(plainPassword,cb){
    //plainPassword a12vvv 암호화된 비밀번호 $2b$10$Z0/poatiimgU8bFsaQWs7.EwT0KR073VHcdmk3ieoSbU6KOq0aA/.
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err,isMatch)
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(callback){
    //jsonwebtoken을 이용해서 token을 생성하기

    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //id와 secretToken과 합쳐서 토큰을 만듦.

    user.token = token
    user.save(function(err,user){
        if(err) return callback(err,null)
        callback(null,user)
    })

}

userSchema.statics.findByToken = function(token,cb){
    var user = this;

    //토큰을 decode한다. 
    jwt.verify(tocken, 'secretToken',function(err,decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded,"token":token}, function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}

const User = moongoose.model('User',userSchema)

module.exports = {User}