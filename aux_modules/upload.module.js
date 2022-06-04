var UploadModel = require('../models/upload.model');
/**
 * El campo status es 0 para un archivo no confirmado que significa que esta subido pero que aun no se ha comprobado
 * si se debe de borrar o no segun la fecha que ha pasado desde la subida por algún error en salvar el registro al que
 * esta asociado.
 * 1 = confirmado es un archivo que pertenece a un registro
 * @type {{saveFile: module.exports.saveFile, currentDate: module.exports.currentDate}}
 */
module.exports = {
    saveFile: function (_type, _name) {
        const upload_row = new UploadModel({
            type: _type,
            name: _name,
            status: '0',
            upload_date: Date.now(),
        });
        upload_row.save(function (err, registro) {

            if (err) {
                console.log(err);
            } else {
                console.log(registro._id);
            }
        });
        return upload_row;
        //console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000) + ' id: ' + _id);
    },
    currentDate: function () {
        console.log('Current Date is: ' + new Date().toISOString().slice(0, 10));
    }
};

function hola() {
    console.log('xx');
}
