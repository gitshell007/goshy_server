var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Entities = require('html-entities').Html5Entities;
var Schema = mongoose.Schema;
var schemaOptions = {
    collection: 'health_company',
    toJSON: {
        virtuals: true
    }
};
var Health_companySchema = Schema({

    des: {
        type: String,
        required: 1,
        unique: 0
    },
    code: {
        type: String,
        required: 1,
        unique: 0
    }
}, schemaOptions);



Health_companySchema.plugin(mongoosePaginate);
//Export model
module.exports = mongoose.model('Health_company', Health_companySchema);