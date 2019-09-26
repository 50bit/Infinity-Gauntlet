const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');


var UserSchema = mongoose.Schema({

    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
});

UserSchema.plugin(uniqueValidator);

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser,callback){

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            newUser.password=hash;
            newUser.save(callback);
        });
    });

}

module.exports.getUserByEmail = function(email,callback){
    var query = { email : email};
    User.findOne(query,callback);
}

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.comparePassword = function (candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatched)=>{
        if(err){
            console.error(err);
        }
        callback(null,isMatched)
    })
}
