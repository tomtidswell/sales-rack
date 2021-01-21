const _ = require('lodash')
const Product = require('../models/product')


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
    if (!req.query || !req.query.q) {
        return res.status(200).json([])
    }
    console.log('Query:', req.query.q)
    // const query = req.body.join('|')
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
                        "query": req.query.q
                    }
                },
                {
                    "text": {
                        "path": "name",
                        "query": req.query.q,
                        score: { boost: { value: 2 } }
                    }
                }
            ]
        }
    })
    .project({
        "_id": 0,
        "name": 1,
        "category": 1,
        "score": { "$meta": "searchScore" }
    })
    .limit(10)
    // .sort({ 'updatedAt': -1 })
    .then(products => {
        console.log(products)    
        return res.status(200).json({products})
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
