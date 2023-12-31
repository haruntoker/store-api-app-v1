const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
require('express-async-errors')


const app = express()

//import routes
const productsRouter = require('./routes/products.js')

//CUSTOM MIDDLEWARE - not found + error middlewares from "middleware" folder
const notFoundMW = require('./middleware/not-found')
const errorHandlerMW = require('./middleware/error-handler')



//middlewares
app.use(bodyParser.json())
app.use(express.json())




//main route
app.get('/', (req,res)=>{
    res.send('Store API App')
})

//base route from "routes" file
app.use('/api/v1/products', productsRouter )




//products routes



//CUSTOM MIDDLEWARE INVOKE - Must be before PORT & DB Connection.
app.use(errorHandlerMW)
app.use(notFoundMW)



//env + port + mongoDB
dotenv.config()
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI


//connect mongoDB Async
const connect = async() =>{
    try {
        await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });

        console.log("DB connected succesfully!");
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
}

connect()

