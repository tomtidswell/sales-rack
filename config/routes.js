const router = require('express').Router()
const productController = require('../controllers/products')

// a shorthand can be used, which is enabled through the express package
router.route('/products')
  .get(productController.index)
  .post(productController.create)

router.route('/products/:id')
  .get(productController.show)
  .put(productController.edit)
  .delete(productController.delete)

// catch all of the remaining routes and verbs (.all is a shortcut for all get/post/put etc...)
router.route('/*')
  .all((req,res)=> res.status(405).json({message: 'Method not allowed', image: 'https://httpstatusdogs.com/405'}))

module.exports = router
