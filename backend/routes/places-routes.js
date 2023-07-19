const express = require('express');
const HttpError = require("../models/http-error");

const router = express.Router();

const DummyPlaceList = [
    {
        id: '1',
        title: 'Berat View',
        description: 'Nice view.',
        address: 'Berat',
        location: {
            latitude: 41,
            longitude: 20,
        },
        creatorId: '1',
    },
    {
        id: '2',
        title: 'Saranda View',
        description: 'Nice dinner.',
        address: 'Saranda',
        location: {
            latitude: 30,
            longitude: 10,
        },
        creatorId: '1',
    },
]

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid
    const place = DummyPlaceList.find((p) => p.id === placeId);

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided id.', 404)
        )
    }

    res.json({place}); // => { place } => { place: place }
});


router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid
    const place = DummyPlaceList.find((p) => p.creatorId === userId);

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided user id.', 404)
        );
    }

    res.json({place});
});

module.exports = router;
