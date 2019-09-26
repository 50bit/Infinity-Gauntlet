const mongoose = require('mongoose');


var ProductSchema = mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String
    },
    tags:{
        type:Array
    }
});

var Product = module.exports = mongoose.model('Product',ProductSchema);