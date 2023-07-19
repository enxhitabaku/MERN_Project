const HttpError = require("../models/http-error");
const uuid = require('uuid');

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

function createPlace(req, res, next) {
    const {title, description, location, address, creatorId} = req.body;

    const createdPlace = {
        id: uuid.v4(),
        title,
        description,
        address,
        location,
        creatorId
    }

    DummyPlaceList.push(createdPlace);

    res.status(201).json(createdPlace);
}

function updatePlace(req, res, next) {
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
