const express = require('express');
const router = express.Router();

const placesController = require('../controllers/places-controller')
const {validatePlaceParamsOnCreate, validatePlaceParamOnUpdate} = require("../middleware/param-validation");
const fileUpload = require('../middleware/file-upload');
const checkAuth = require("../middleware/check-auth");

router.get('/:pid', placesController.getPlaceById);

router.get('/user/:uid', placesController.getPlacesByUserId);

router.use(checkAuth);

router.post('/', fileUpload.single('image'), validatePlaceParamsOnCreate, placesController.createPlace);

router.patch('/:pid', validatePlaceParamOnUpdate, placesController.updatePlace);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;
