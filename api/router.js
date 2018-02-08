var express = require('express')
var router = express.Router({mergeParams: true}) // don't forget the parent params!
var professorRouter = require('./routes/professors')

router.get('/', function (req, res, next) {
  res.send('API Root')
})


router.use('/professors',professorRouter)

module.exports = router