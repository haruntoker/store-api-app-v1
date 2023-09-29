const Product = require('../models/product')


//1
const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({}).sort('-name price')
    res.status(200).json({products, nbHits: products.length})
}

//2
const getAllProducts = async (req,res) => {
    const {featured, company, name, sort} = req.query
    const queryObject = {}
    //A
    if(featured){
        queryObject.featured = featured === "true" ? true : false
    }
    // B
    if(company){
        queryObject.company = company 
    }
    //C
    if(name){
        queryObject.name = { $regex: name, $options: "i"}
    }

    console.log(queryObject);

    let result =  Product.find(queryObject);

    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }else{
        result = result.sort("createdAt")
    }
    
    const products = await result
    res.status(200).json({products, nbHits: products.length})
};




//export
module.exports = {
    getAllProductsStatic,
    getAllProducts
}
