const dotenv = require('dotenv')
const mongoose = require('mongoose')

const Product = require('./models/product'); //schama model
const jsonProduct = require('./products.json') //data 



dotenv.config()
const MONGO_URI =  process.env.MONGO_URI

const start = async () =>{
    try {
        await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
       
        await Product.deleteMany();
        await Product.create(jsonProduct);
        console.log("Success!!");
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()


/** await Product.deleteMany();
 * It delete existing data froom "Product" collection in mongoDB
  database before inserting new data. If you dont add it, the new
  data will be added to existing data in the collection.
 */