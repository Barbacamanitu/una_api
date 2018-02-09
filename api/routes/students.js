var express = require('express')
var router = express.Router({mergeParams: true}) // don't forget the parent params!


//Route for getting all students for a given professor id
router.get('/', function (req, res, next) {
  
  var profId = req.params.professor_id;
  var q = req.query;
  if (q.attended){
    getStudentsByAttendance(req,res,profId,q.attended);
  } else {
    getAllStudents(req,res,profId);
  }
  
})

function getStudentsByAttendance(req,res,pid,attendance){
  req.models.student.searchByAttendance(pid,attendance).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({error: "Couldnt get students for professor with id: " + profId.toString()});
  })
}

function getAllStudents(req,res,pid){
  req.models.student.allByProfessorID(pid).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({error: "Couldnt get students for professor with id: " + profId.toString()});
  })
}


router.get('/:student_id',function(req,res,next) {
  var profId = req.params.professor_id;
  var sid = req.params.student_id;
  req.models.student.oneByProfessorID(profId,sid).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({error: "Couldnt get students for professor with id: " + profId.toString()});
  })
})

/*
  TODO: Add update method.
  Accept an array of attendance records
  and update db accordingly.
*/

router.post('/',(req,res,next) => {
  console.log(req.body);
  res.json({message: "this is a patch boi"});
})

module.exports = router