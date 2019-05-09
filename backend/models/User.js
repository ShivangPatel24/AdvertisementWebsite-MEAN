var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password1:{type:String, required:true}
})

userSchema.methods.isValid = function( pwd ) {
    return ( this.password1 === pwd );
};

var User = module.exports = mongoose.model('User',userSchema);