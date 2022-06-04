var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Entities = require('html-entities').Html5Entities;
var Schema = mongoose.Schema;
var schemaOptions = {
    collection: 'payment_type',
    toJSON: {
        virtuals: true
    }
};
var Payment_typeSchema = Schema({

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



Payment_typeSchema.plugin(mongoosePaginate);
//Export model
module.exports = mongoose.model('Payment_type', Payment_typeSchema);