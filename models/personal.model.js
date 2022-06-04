var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Entities = require('html-entities').Html5Entities;
var Schema = mongoose.Schema;
var schemaOptions = {
    collection: 'personal',
    toJSON: {
        virtuals: true
    }
};
var PersonalSchema = Schema({

    first_name: {
        type: String,
        required: 1,
        unique: 0
    },
    last_name: {
        type: String,
        required: 1,
        unique: 0
    },
    enabled: {
        type: String,
        required: 1,
        unique: 0
    },
    username: {
        type: String,
        required: 1,
        unique: 0
    },
    email: {
        type: String,
        required: 1,
        unique: 0
    },
    password: {
        type: String,
        required: 1,
        unique: 0
    },
    cod_corto: {
        type: String,
        required: 1,
        unique: 0
    },
    phone_mobile1: {
        type: String,
        required: 1,
        unique: 0
    },
    phone_mobile2: {
        type: String,
        required: 1,
        unique: 0
    },
    phone_fixed: {
        type: String,
        required: 1,
        unique: 0
    },
    fecha_nac: {
        type: String,
        required: 1,
        unique: 0
    },
    nif: {
        type: String,
        required: 1,
        unique: 0
    },
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
    },
    user_type: {
        type: String,
        required: 1,
        unique: 0
    },
    tax_type: {
        type: String,
        required: 1,
        unique: 0
    },
    payment_type: {
        type: String,
        required: 1,
        unique: 0
    },
    photo: {
        type: String,
        required: 1,
        unique: 0
    }
}, schemaOptions);



PersonalSchema.plugin(mongoosePaginate);
//Export model
module.exports = mongoose.model('Personal', PersonalSchema);