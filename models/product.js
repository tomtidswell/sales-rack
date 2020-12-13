//use this file to define the schema and model of the objects required for the api
//mongoose is an ODM (object data modeller)- an interface between the database and the programming language
const mongoose = require('mongoose')

// create the schema as a blueprint of a product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  prices: { type: Array },
  prev_price: { type: String },
  sale_price: { type: String },
  badge: { type: String },
  main_image: { type: String },
  hover_image: { type: String },
  images: { type: Array },
  source: { type: String },
}, { timestamps: true })

//this package enhances the validation made against the schema for unique entries, and it makes it more like the other types of schema validation
productSchema.plugin(require('mongoose-unique-validator'))

//register the schema as a model for a product object, and export it
module.exports = mongoose.model('Product', productSchema)
