var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Entities = require('html-entities').Html5Entities;
var Schema = mongoose.Schema;
var schemaOptions = {
    collection: 'municipios',
    toJSON: {
        virtuals: true
    }
};
var MunicipiosSchema = Schema({

    localidad: {
        type: String,
        required: 1,
        unique: 0
    },
    provincia: {
        type: String,
        required: 1,
        unique: 0
    },
    cp: {
        type: String,
        required: 1,
        unique: 0
    }
}, schemaOptions);



MunicipiosSchema.plugin(mongoosePaginate);
//Export model
module.exports = mongoose.model('Municipios', MunicipiosSchema);