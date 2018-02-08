var orm = require("orm");
module.exports = (db) => {
    var ProfessorModel = db.define("professor",
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

        ProfessorModel.all = async () => {
            return await ProfessorModel.findAsync();
        }

        ProfessorModel.byID = async (id) => {
            return await  ProfessorModel.getAsync(id);
        }

        ProfessorModel.byName = async (n) => {
            return await  ProfessorModel.findAsync({name: orm.like("%" + n + "%")});
        }
        return ProfessorModel;
}

