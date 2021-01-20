const _ = require('lodash')
const Product = require('../models/product')

// INDEX handler
function indexHandler(req, res, next) {
    // { $gte:  }
    const timeBoundary = new Date(Date.now() - (3000 * 60000)) // 3000 minutes
    console.log(timeBoundary)
    Product
        //access the query parameters in the url using req.query
        .find(
            { updatedAt: { $gte: timeBoundary } }, //, price: { $exists: true }
            ['category', 'name', 'image', 'url', 'updatedAt', 'price', 'prevPrice', 'disc%', 'disc£']
        )
        // .sort({ 'updatedAt': -1 })
        .then(products => res.status(200).json(products))
        .catch(next)
}

// INDEX RETAILER handler
function retailerIndexHandler(req, res, next) {
    const { retailer } = req.params
    console.log('retailer:', retailer)
    const timeBoundary = new Date(Date.now() - (3000 * 60000)) // 3000 minutes
    Product
        //access the query parameters in the url using req.query
        .find(
            { retailer, updatedAt: { $gte: timeBoundary } }, 
            ['category', 'name', 'image', 'url', 'updatedAt', 'price', 'prevPrice', 'disc%', 'disc£']
        )
        .then(products => res.status(200).json(products))
        .catch(next)
}

// INDEX RETAILER handler
function categoryIndexHandler(req, res, next) {
    const { category } = req.params
    console.log('category:', category)
    const timeBoundary = new Date(Date.now() - (3000 * 60000)) // 3000 minutes
    Product
        //access the query parameters in the url using req.query
        .find(
            { category, updatedAt: { $gte: timeBoundary } }, 
            ['category', 'name', 'image', 'url', 'updatedAt', 'price', 'prevPrice', 'disc%', 'disc£']
        )
        // .sort({ 'updatedAt': -1 })
        .then(products => res.status(200).json(products))
        .catch(next)
}

// SHOW handler
function showHandler(req, res, next) {
    Product
        .findById(req.params.id)
        .then(product => {
            //.then will trigger if the id was valid, but does the product exist in the database?
            if (!product) throw new Error('Not Found')
            return res.status(200).json(product)
        })
        //an error will be thrown if the id was not valid
        .catch(next)
}

// EDIT / CREATE handler
function editHandler(req, res, next) {
    const { url, priceData } = req.body
    if (!url) throw new Error('Bad request')
    Product
        //access the query parameters in the url using req.query
        .findOneAndUpdate({ url }, req.body, { new: true, upsert: true })
        .then(product => {
            if (!product) throw new Error('Not Found')
            // the force parameter will force a price update
            product.addPrice(priceData, req.query.force === 'true')
            // if (product.id) delete product.id
            console.log('Saving:',product)
            return product.save()
        })
        .then(product => res.status(202).json(product))
        .catch(next)
}

// DELETE handler
function deleteHandler(req, res, next) {
    Product
        .findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(204))
        .catch(next)
}

// KEYWORDS handler
function keywordsHandler(req, res, next) {
    Product
        //access the query parameters in the url using req.query
        .find({}, 'name')
        // .sort({ 'updatedAt': -1 })
        .then(products => {
            const keywords = _.chain(products).map('name').map(_.words).flatten().uniq().filter(x=>!parseInt(x) && x.length > 2).sort().value()
            return res.status(200).json(keywords)
        })
        .catch(next)
}

// SEARCH handler
function searchHandler(req, res, next) {
    if (!req.body || !req.body.length) {
        return res.status(200).json([])
    }
    const query = req.body.join('|')
    console.log(query)
    Product
        //access the query parameters in the url using req.query
        .find({ name: new RegExp(`(${query})`, "i") }, [], { limit: 20 })
        // .sort({ 'updatedAt': -1 })
        .then(products => res.status(200).json(products))
        .catch(next)
}


//build up the export object so it can simply be imported in the Handlerr file
module.exports = {
    index: indexHandler,
    keywords: keywordsHandler,
    categoryIndex: categoryIndexHandler,
    retailerIndex: retailerIndexHandler,
    show: showHandler,
    // create: createHandler,
    edit: editHandler,
    search: searchHandler,
    delete: deleteHandler,
}
