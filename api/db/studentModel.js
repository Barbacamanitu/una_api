var orm = require("orm");
module.exports = (db) => {
    var StudentModel = db.define("student",
        {
            id: Number,
            name: String
        },
        {
            methods: {
               
            },
            validations: {
            }
        });

        StudentModel.allByProfessorID = async (pid) => {
            var sql = `
            SELECT s.id, s.name, sp.attended
            FROM student as s
            INNER JOIN student_professor as sp
            ON sp.student_id = s.id
            WHERE sp.professor_id = ?
            `;
            return new Promise((resolve,reject) => {
                db.driver.execQuery(sql,pid, function (err, data) { 
                    if (err){
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
        }


        StudentModel.searchByAttendance = async(pid,attended) => {
            var sql =  `SELECT s.id, s.name, sp.attended
            FROM student as s
            INNER JOIN student_professor as sp
            ON sp.student_id = s.id
            WHERE sp.professor_id = ?
            AND sp.attended = ?`;
            return new Promise((resolve,reject) => {
                db.driver.execQuery(sql,[pid,attended],(err,data) => {
                    if (err){
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
            
        }

        StudentModel.oneByProfessorID = async (pid,id) => {
            var sql = `
            SELECT s.id, s.name, sp.attended
            FROM student as s
            INNER JOIN student_professor as sp
            ON sp.student_id = s.id
            WHERE sp.professor_id = ?
            AND s.id = ?
            `;
            return new Promise((resolve,reject) => {
                db.driver.execQuery(sql,[pid,id], function (err, data) { 
                    if (err){
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
        }

        StudentModel.byID = async (id) => {
            return await  StudentModel.getAsync(id);
        }

        StudentModel.byName = async (n) => {
            return await  StudentModel.findAsync({name: orm.like("%" + n + "%")});
        }
        return StudentModel;
}

