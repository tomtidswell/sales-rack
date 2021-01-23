const _ = require('lodash')
const Product = require('../models/product')
const postProcess = require('../lib/autocomplete')

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
    // console.log('Query:', req.query.q)
    const query = req.body
    console.log('Query:', query)
    Product.aggregate()
    // .search({
    //     text: {
    //         query: req.query.q,
    //         path: { value: "name" } //, multi: "keywordAnalyser"
    //     }
    // })
    // .search({
    //     text: {
    //         query: req.query.q,
    //         path: { value: "category"} 
    //     }
    // })
    .search({
        "compound": {
            "should": [
                {
                    "text": {
                        "path": "category",
                        "query": query,
                        "fuzzy": {
                            "maxEdits": 1,
                            "maxExpansions": 100,
                        }
                    }
                },
                {
                    "text": {
                        "path": "name",
                        "query": query,
                        "fuzzy": {
                            "maxEdits": 2,
                            "maxExpansions": 100,
                        },
                        score: { boost: { value: 2 } }
                    }
                }
            ]
        }
    })
    // Product.aggregate().search({
    //     "autocomplete": {
    //         "path": "name",
    //         "query": query,
    //         "tokenOrder": "any",
    //         "fuzzy": {
    //             "maxEdits": 1,
    //             "prefixLength": 2,
    //             "maxExpansions": 256
    //         }
    //     },
    //     "highlight": {
    //         "path": "name"
    //     },
    // })
    .project({
        "_id": 0,
        "name": 1,
        "image": 1,
        "url": 1,
        "updatedAt": 1,
        "price": 1,
        "prevPrice": 1,
        "category": 1,
        "score": { "$meta": "searchScore" },
        // "highlights": { "$meta": "searchHighlights" }
    })
    .limit(8)
    // .sort({ 'updatedAt': -1 })
    .then(products => {
        // console.log(products)
        return Product.aggregate().search({
            "autocomplete": {
                "path": "name",
                "query": query,
                "tokenOrder": "any",
                "fuzzy": {
                    "maxEdits": 2,
                    "prefixLength": 2,
                    "maxExpansions": 256
                }
            },
            "highlight": {
                "path": "name"
            },
        }).project({
            "_id": 0,
            "category": 1,
            "highlights": { "$meta": "searchHighlights" }
        }).then(fullAutocomplete=>{
            const {auto, phrases, categories} = postProcess(fullAutocomplete)
            return { auto, phrases, products, categories }
        })
    })
    .then(results => {
        // console.log(results)
        return res.status(200).json( results )
    })
    .catch(next)
}

// Model.aggregate().
//     search({
//         text: {
//             query: 'baseball',
//             path: 'plot'
//         }
//     });


//build up the export object so it can simply be imported in the Handlerr file
module.exports = {
    keywords: keywordsHandler,
    search: searchHandler,
}
