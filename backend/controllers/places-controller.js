const {validationResult} = require('express-validator');

const HttpError = require("../models/http-error");
const Place = require("../database/models/place")

let DummyPlaceList = [
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

function getPlaceById(req, res, next) {
    const placeId = req.params.pid
    const place = DummyPlaceList.find((p) => p.id === placeId);

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided id.', 404)
        )
    }

    res.json({place});
}

function getPlacesByUserId(req, res, next) {
    const userId = req.params.uid
    const places = DummyPlaceList.filter((p) => p.creatorId === userId);

    if (!place || places.length === 0) {
        return next(
            new HttpError('Could not find any place for the provided user id.', 404)
        );
    }

    res.json({places});
}

async function createPlace(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {title, description, location, creatorId} = req.body;

    const createdPlace = new Place({
        title,
        description,
        location: location,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
        creatorId
    });

    try {
        await createdPlace.save();
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json(createdPlace);
}

function updatePlace(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {title, description} = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {...DummyPlaceList.find(p => p.id === placeId)};
    const placeIndex = DummyPlaceList.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DummyPlaceList[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};

function deletePlace(req, res, next) {
    const placeId = req.params.pid;
    if (!DummyPlaceList.find(p => p.id === placeId)) {
        return next(
            new HttpError('Could not find a place for that id.', 404)
        )
    }
    DummyPlaceList = DummyPlaceList.filter(p => p.id !== placeId);
    res.status(200).json({message: 'Deleted place.'});
};

module.exports = {
    getPlaceById: getPlaceById,
    getPlacesByUserId: getPlacesByUserId,
    createPlace: createPlace,
    updatePlace: updatePlace,
    deletePlace: deletePlace
}
