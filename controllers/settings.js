const Setting = require('../models/setting')

// INDEX handler
function indexRoute(req, res, next) {
    Setting
        //access the query parameters in the url using req.query
        .find(req.query)
        .then(settings => res.status(200).json(settings))
        .catch(next)
}

// GET handler
function getRoute(req, res, next) {
    Setting
        //access the query parameters in the url using req.query
        .find(req.query)
        .then(settings => res.status(200).json(settings))
        .catch(next)
}


// CREATE product price
function createRoute(req, res, next) {
    Setting
        .create(req.body)
        .then(scrapeData => res.status(201).json(scrapeData))
        .catch(next)
}


// EDIT scrape setting
function editRoute(req, res, next) {
    const {_id} = req.body
    Setting
        //access the query parameters in the url using req.query
        .findOneAndUpdate({_id}, req.body, { new: true, upsert: false })
        // .then(setting => {
        //     if (!setting) throw new Error('Not Found')
        // })
        .then(setting => res.status(202).json(setting))
        .catch(next)
}


//build up the export object so it can simply be imported in the router file
module.exports = {
    create: createRoute,
    index: indexRoute,
    get: getRoute,
    edit: editRoute,
}
