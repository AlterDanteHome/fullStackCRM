const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const orderSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    },
    order:{
        type:Number,
        required:true
    },
    list:[
        {
            name:{
                type: String
            },
            quantity:{
                type: Number
            },
            cost:{
                type: Number
            },
        }
    ],
    user:{
        ref:'users',
        type:Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('order',orderSchema);