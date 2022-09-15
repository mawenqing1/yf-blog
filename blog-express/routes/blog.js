var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
  res.json({
    code: 1,
    data: [1231,5465]
  })
});

router.get('/detail', function(req, res, next) {
    res.json({
      code: 1,
      data: 'detail'
    })
  });

module.exports = router;