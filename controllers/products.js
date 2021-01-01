const Product = require('../models/product')

// INDEX handler
function indexRoute(req, res, next) {
    Product
        //access the query parameters in the url using req.query
        .find(req.query)
        .then(products => res.status(200).json(products))
        .catch(next)
}

// SHOW handler
function showRoute(req, res, next) {
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

// CREATE handler
// function createRoute(req, res, next) {
//     Product
//         .create(req.body)
//         .then(product => res.status(201).json(product))
//         .catch(next)
// }

// EDIT handler
function editHandler(req, res, next) {
    const { url, priceData } = req.body
    if (!url) throw new Error('Bad request')

    Product
        //access the query parameters in the url using req.query
        .findOneAndUpdate({ url }, req.body, { new: true, upsert: true })
        .then(product => {
            if (!product) throw new Error('Not Found')
            product.addPrice(priceData)
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


//build up the export object so it can simply be imported in the router file
module.exports = {
    index: indexRoute,
    show: showRoute,
    // create: createRoute,
    edit: editHandler,
    delete: deleteHandler,
}
