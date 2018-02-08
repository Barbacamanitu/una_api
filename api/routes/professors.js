var express = require('express')
var router = express.Router({mergeParams: true}) // don't forget the parent params!
var studentRouter = require('./students')

router.get('/', function (req, res, next) {
  req.models.professor.all().then((profs) => {
    res.json(profs);
  }).catch((err) => {
    res.json({error: "Couldn't get professors"});
  })  
})

router.get('/:professor_id',function(req,res,next) {
  req.models.professor.getAsync(req.params.professor_id).then((prof) => {
    res.json(prof);
  }).catch((err) => {
    res.json({error: "Couldn't get professor"});
  })  
})

router.use('/:professor_id/students',studentRouter)

module.exports = router