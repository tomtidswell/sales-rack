//use this file to define the schema and model of the objects required for the api

//mongoose is an ODM (object data modeller)- an interface between the database and the programming language
const mongoose = require('mongoose')


// create the schema as a blueprint of a price
const settingSchema = new mongoose.Schema({
    retailer: { type: String, required: true },
    category: { type: String, required: true },
    page: { type: String, required: true },
    privacySelector: { type: String, required: false },
    gridItemSelector: { type: String, required: true },
    paginationSelector: { type: String, required: false },
    urlPaginationPattern: { type: String, required: false },
}, { timestamps: true })

//this package enhances the validation made against the schema for unique entries, and it makes it more like the other types of schema validation
// settingSchema.plugin(require('mongoose-unique-validator'))

//register the schema as a model for a price object, and export it
module.exports = mongoose.model('Setting', settingSchema)
