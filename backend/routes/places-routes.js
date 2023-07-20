const express = require('express');

const placesController = require('../controllers/places-controller')
const {validatePlaceParamsOnCreate, validatePlaceParamOnUpdate} = require("../middleware/param-validation");
const router = express.Router();

router.get('/:pid', placesController.getPlaceById);

router.get('/user/:uid', placesController.getPlacesByUserId);

router.post('/', validatePlaceParamsOnCreate, placesController.createPlace);

router.patch('/:pid', validatePlaceParamOnUpdate, placesController.updatePlace);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;
