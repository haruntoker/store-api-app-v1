const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Product name must be provided!"]
    },

    price:{
        type:Number,
        required:[true, "Product price must be provided!"]
    },

    featured:{
        type:Boolean,
        default:false

       /**
        *  if you create a new product without specifying whether it's featured or not,
        *  it will be considered as not featured by default.
        */
    },

    rating:{
        type:Number,
        default:4.5
        /**
         *  if you create a new product without specifying its rating,
         *  it will be assigned a default rating of 4.5:
         */
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },

    company:{
        type:String,
        enum:['ikea', 'liddy', 'caressa', 'marcos'],
    }
})



module.exports = mongoose.model("Product", productSchema)


/**NOTE - DEFAULT
 * This default value is useful when you have products that are newly added
 *  and don't have a specific rating assigned yet.
 *  It ensures that every product has a reasonable starting rating,
 *  and you can update it later if needed.
 */