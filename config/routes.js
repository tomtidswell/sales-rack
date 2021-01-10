const router = require('express').Router()
const productController = require('../controllers/products')
const scrapeController = require('../controllers/scrapes')
const settingController = require('../controllers/settings')

router.route('/products')
  .get(productController.index)
  .put(productController.edit)
  //   .post(productController.create)

router.route('/products/search')
  .put(productController.search)

  router.route('/products/:id')
  .get(productController.show)
  .delete(productController.delete)

router.route('/keywords')
  .get(productController.keywords)
  
  
router.route('/category/:category')
  .get(productController.categoryIndex)

router.route('/retailer/:retailer')
  .get(productController.retailerIndex)

router.route('/scrapes')
  .get(scrapeController.index)
  .post(scrapeController.create)

router.route('/scrapesettings')
  .get(settingController.index)
  .post(settingController.create)
  
  router.route('/scrapesettings/:id')
  .get(settingController.get)
  .put(settingController.edit)

  //   .post(productController.create)
    // router.route('/products/:id/prices')
//     .get(pricesController.index)
//     .post(pricesController.create)

// router.route('/price/:id')
//     .put(pricesController.edit)
//     .delete(pricesController.delete)

// catch all of the remaining routes and verbs (.all is a shortcut for all get/post/put etc...)
router.route('/*')
  .all((req,res)=> res.status(405).json({message: 'Method not allowed', image: 'https://httpstatusdogs.com/405'}))

module.exports = router
