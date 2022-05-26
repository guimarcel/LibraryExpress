const router = require('express').Router()

var bookController = require('../controllers/bookController')

router.post('/create-update', bookController.createOrUpdate)
router.post('/delete', bookController.delete)
router.get('/', bookController.show)


module.exports = router 
