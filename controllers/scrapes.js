const Scrape = require('../models/scrape')

// INDEX handler
function indexRoute(req, res, next) {
    Scrape
        //access the query parameters in the url using req.query
        .find(req.query)
        .then(prices => res.status(200).json(prices))
        .catch(next)
}


// CREATE product price
function createRoute(req, res, next) {
    Scrape
        .create(req.body)
        .then(scrapeData => res.status(201).json(scrapeData))
        .catch(next)
}


//build up the export object so it can simply be imported in the router file
module.exports = {
    index: indexRoute,
    create: createRoute,
}
