var mongoose = require('mongoose');

var adSchema = mongoose.Schema({
    title:{type:String, required:true},
    category:{type:String, required:true},
    addesc:{type:String, required:true},
    price:{type:Number, required:true},
    name:{type:String, required:true},
    city:{type:String, required:true}
})



var Ad = module.exports = mongoose.model('Ad',adSchema);