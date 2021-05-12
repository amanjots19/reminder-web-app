var express = require('express');
var router = express.Router();
var controller = require('../controllers/scheduler');


router.post('/create/reminder' ,controller.create );
router.post('/update/reminder' ,controller.update );
router.post('/delete/reminder' ,controller.delete );


module.exports = router;
