//use this file to define the schema and model of the objects required for the api
//mongoose is an ODM (object data modeller)- an interface between the database and the programming language
const mongoose = require('mongoose')
const { parsePrice, parseDiscount } = require('../lib/utils')


// const priceSchema = new mongoose.Schema({
//     price: { type: String, required: false },
//     priceRange: { type: String, required: false },
//     priceDescription: { type: String, required: false },
//     prevPrice: { type: String, required: false },
//     prevPriceDescription: { type: String, required: false },
//     discount: { 
//         "%": { type: Number, required: false, default: 0 },
//         "£": { type: Number, required: false, default: 0 },
//     },
//     badge: { type: String, required: false },
// }, { 
//     timestamps: true,
// })


// example setter
// function obfuscate (dBText) {
//     return "*****"
// }

// create the schema as a blueprint of a product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    price: { type: String, required: false },
    prevPrice: { type: String, required: false },
    priceRange: { type: String, required: false },
    "disc%": { type: Number, required: false, default: 0 },
    "disc£": { type: Number, required: false, default: 0 },
    badge: { type: String, required: false },
    // prices: { type: mongoose.Schema.ObjectId, ref: 'Prices' },
    image: { type: String },
    source: { type: String },
    retailer: { type: String },
    category: { type: String },
    // secret: { type: String, get: obfuscate },
}, {
    timestamps: true, 
})

// add a virtual field of latest price, which is just the most recent item from the price history
// productSchema.virtual('latestPrice').get((value, virtual, doc)=>{
//     if (!doc.priceHistory) return undefined
//     return doc.priceHistory[doc.priceHistory.length - 1]
// })

// add a virtual field of active discount, which is just the most recent item from the price history
// productSchema.virtual('discount').get((value, virtual, doc)=>{
//     const priceData = doc.priceHistory[doc.priceHistory.length - 1]
//     const discount = priceData.discount || undefined
//     const { price, priceRange } = parsePrice(priceData.price)
//     const { price: prevPrice } = parsePrice(priceData.prevPrice)
//     if (!discount || priceRange || !prevPrice) return { "%": 0, "£": 0 }
//     return { "%": discount, "£": prevPrice - price}
// })

// add a virtual field of active discount amount, which is just the most recent item from the price history
// productSchema.virtual('activeMoneyOff').get((value, virtual, doc) => {
// })

// helper function to handle adding a new price
productSchema.methods.addPrice = function () {
    // this function should be used to add a new price history slice for the product

    // const { price, priceRange } = parsePrice(this.price)
    // const { price: prevPrice } = parsePrice(this.prevPrice)
    // console.log('Parsed prices:', price, priceRange)
    
    // if (priceRange) {
    //     this.price = price
    //     this.priceRange = priceRange
    // }
    
    // //calculate the discount, and overwrite the incoming discount value (if any)
    // if (prevPrice && !priceRange){
    //     const calcDiscount = 100 - Math.floor(price / prevPrice * 100) 
    //     this['disc%'] = calcDiscount
    //     this['disc£'] = prevPrice - price
    //     console.log('Calculated discount:', this['disc%'], this['disc£'])
    // }
    
    // extract a discount from the savings message
    // if (priceData.badge && !priceData.discount){
        //     const discount = parseDiscount(priceData.badge)
        //     console.log('Extracted discount:', discount)
        //     if (discount) {
            //         // set this extracted result as the discount and remove the badge
    //         priceData.discount = { '%': discount }
    //         delete priceData.badge
    //     }
    // }
    
    // TODO: add price timesliceslice logic
}


//this package enhances the validation made against the schema for unique entries, and it makes it more like the other types of schema validation
productSchema.plugin(require('mongoose-unique-validator'))

//register the schema as a model for a product object, and export it
module.exports = mongoose.model('Product', productSchema)
