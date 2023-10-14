const express= require('express');
 const timer = require('../controllers/timer.controller');
const router= express.Router()

router.post('/', timer.createTimer)
router.patch('/:id',timer.editTimer)


module.exports=router
