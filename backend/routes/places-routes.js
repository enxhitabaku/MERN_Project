const express = require('express');
const {check} = require('express-validator');

const placesController = require('../controllers/places-controller')
const router = express.Router();

router.get('/:pid', placesController.getPlaceById);


router.get('/user/:uid', placesController.getPlacesByUserId);

router.post('/',
    [
        check('title')
            .not()
            .isEmpty(),
        check('description').isLength({min: 5}),
        check('location.latitude')
            .isFloat({min: 1}),
        check('location.longitude')
            .isFloat({min: 1})
    ],
    placesController.createPlace);

router.patch('/:pid',
    [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .not()
            .isEmpty()
    ],
    placesController.updatePlace);

router.delete('/', placesController.deletePlace);

module.exports = router;
