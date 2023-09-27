const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const app = express()

//middlewares
app.use(bodyParser.json)


















//env + port + mongoDB
dotenv.config()

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI


mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true

})
.then(()=>{
    console.log("DB connected succesfully!");
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    })
})
.catch((err)=> console.log(err))