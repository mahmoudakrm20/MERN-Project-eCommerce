var express = require('express');
var router = express.Router();
var path = require('path');
const errorHandler = require('../Middleware/errorMiddleware');

router.use(express.static(path.join(__dirname, '../../Frontend/build')));

router.get('/', function(req, res, next) {
  try {
    res.sendFile(path.join(__dirname, '../../Frontend/public', 'index.html'));
  } catch (err) {
    next(err); 
  }
});
router.use(errorHandler);

module.exports = router;