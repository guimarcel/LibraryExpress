var router = require('express').Router()

var userController = require('../controllers/userController')

router.post('/create-update', userController.createOrUpdate)
router.post('/delete', userController.delete)
router.get('/', userController.show)

module.exports = router 
