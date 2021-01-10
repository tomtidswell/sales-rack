//use this file to define the schema and model of the objects required for the api

//mongoose is an ODM (object data modeller)- an interface between the database and the programming language
const mongoose = require('mongoose')


// create the schema as a blueprint of a price
const scrapeSchema = new mongoose.Schema({
    retailer: { type: String, required: true },
    category: { type: String, required: true },
    totalProducts: { type: Number, required: true },
    success: { type: Number, required: true },
    failure: { type: Number, required: true },
}, { timestamps: true })

//this package enhances the validation made against the schema for unique entries, and it makes it more like the other types of schema validation
// scrapeSchema.plugin(require('mongoose-unique-validator'))

//register the schema as a model for a price object, and export it
module.exports = mongoose.model('Scrape', scrapeSchema)
