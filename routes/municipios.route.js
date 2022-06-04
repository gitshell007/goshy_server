var express = require('express');

var router = express.Router();

var municipiosController = require('../controllers/municipios.controller');

/* GET ALL for get Municipios. */

router.get('/', municipiosController.getAllMunicipios);

/* POST request for creating Municipios. */

router.post('/create', municipiosController.createMunicipios);

/* GET request for get Municipios. */

router.get('/:id', municipiosController.getOneMunicipiosItem);

/* UPDATE request for Municipios. */

router.post('/:id/update', municipiosController.updateOneMunicipiosItem);

/* DELETE request for Municipios. */

router.delete('/:id', municipiosController.deleteOneMunicipiosItem);

router.get('/autocomplete/:value', municipiosController.getMunicipiosAutocomplete);

router.get('/cp/:id', municipiosController.getOneMunicipiosItemByCP);

router.get('/manycp/:id', municipiosController.getManyMunicipiosItemByCP);

module.exports = router