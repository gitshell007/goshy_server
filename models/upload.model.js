var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Entities = require('html-entities').Html5Entities;
var Schema = mongoose.Schema;
var schemaOptions = {
    collection: 'upload',
    toJSON: {
        virtuals: true
    }
};
var UploadSchema = Schema({

    type: {
        type: String,
        required: 1,
        unique: 0
    },
    name: {
        type: String,
        required: 1,
        unique: 1
    },
    status: {
        type: String,
        required: 1,
        unique: 0
    },
    upload_date: {
        type: Date,
        required: 0,
        unique: 0
    }
}, schemaOptions);



UploadSchema.plugin(mongoosePaginate);
//Export model
module.exports = mongoose.model('Upload', UploadSchema);