const Product = require('../models/product')

// INDEX handler
function indexRoute(req, res, next){
  Product
    //access the query parameters in the url using req.query
    .find(req.query)
    .then(products => res.status(200).json(products))
    .catch(next)
}

// SHOW handler
function showRoute(req, res, next){
  Product
    .findById(req.params.id)
    .then(product => {
      //.then will trigger if the id was valid, but does the product exist in the database?
      if(!product) throw new Error('Not Found')
      return res.status(200).json(product)
    })
    //an error will be thrown if the id was not valid
    .catch(next)
}

// CREATE handler
function createRoute(req,res, next){
  Product
    .create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next)
}

// EDIT handler
function editHandler(req,res, next){
  Product
    .findById(req.params.id)
    .then(product => {
      if(!product) throw new Error('Not Found')
      console.log('Dino created by:',product.createdBy._id)
      if(!product.createdBy.equals(req.currentUser._id)) throw new Error('Unauthorised')
      // assigning the values of req.body onto product - this is pre-ES6 notation
      Object.assign(product, req.body)
      return product.save()
    })
    .then(product => res.status(202).json(product))
    .catch(next)
}

// DELETE handler
function deleteHandler(req,res, next){
  Product
    .findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next)
}


//build up the export object so it can simply be imported in the router file
module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  edit: editHandler,
  delete: deleteHandler,
}
