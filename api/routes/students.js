var express = require('express')
var router = express.Router({mergeParams: true}) // don't forget the parent params!

router.get('/', function (req, res, next) {
  var profId = req.params.professor_id;
  req.models.student.allByProfessorID(profId).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({error: "Couldnt get students for professor with id: " + profId.toString()});
  })
})

router.get('/:student_id',function(req,res,next) {
  var profId = req.params.professor_id;
  var sid = req.params.student_id;
  req.models.student.oneByProfessorID(profId,sid).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({error: "Couldnt get students for professor with id: " + profId.toString()});
  })
})

module.exports = router