var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Entities = require('html-entities').Html5Entities;
var Schema = mongoose.Schema;
var schemaOptions = {
    collection: 'breed',
    toJSON: {
        virtuals: true
    }
};
var BreedSchema = Schema({

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



BreedSchema.plugin(mongoosePaginate);
//Export model
module.exports = mongoose.model('Breed', BreedSchema);