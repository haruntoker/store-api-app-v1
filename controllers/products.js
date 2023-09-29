const Product = require('../models/product')


//1 - testing
const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({price:{$gt:30}})
    .sort('price')
    .select('name price')
    

    res.status(200).json({products, nbHits: products.length})
}

//2 - appying
const getAllProducts = async (req,res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query
    const queryObject = {}
    //A - featured
    if(featured){
        queryObject.featured = featured === "true" ? true : false
    }
    // B - company
    if(company){
        queryObject.company = company 
    }
    //C - name
    if(name){
        queryObject.name = { $regex: name, $options: "i"}
    }

    console.log(queryObject);

    let result =  Product.find(queryObject);
    //D - sort
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }else{
        result = result.sort("createdAt")
    }

    //E - fields
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    //F - page & limit
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page -1) * limit;

    result = result.skip(skip).limit(limit)

    //G - Numeric
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(mach)=>`-${operatorMap[mach]}-`)
        
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('_')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }

            console.log(filters);
        })
       
    }

    


    const products = await result
    res.status(200).json({products, nbHits: products.length})
};




//export
module.exports = {
    getAllProductsStatic,
    getAllProducts
}

