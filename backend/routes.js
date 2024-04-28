const router = require('express').Router()
const controller = require('../backend/controller')

router.post('/register',controller.register )
router.post('/login', controller.login)
router.get('/fooditems', controller.getfooditem)
router.post('/addfooditems', controller.addfooditem)

module.exports=router