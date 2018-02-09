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

        //Search stuff
        ProfessorModel.search = async(query) => {
            var searchQuery = {};
            if (query.name){
                searchQuery.name = orm.like("%" + query.name + "%");
            }
            return await ProfessorModel.findAsync(searchQuery);
        }

        return ProfessorModel;
}

