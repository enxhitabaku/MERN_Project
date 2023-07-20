const {validationResult} = require('express-validator');

const HttpError = require("../models/http-error");
const {
    createNewPlace,
    createNewPlaceOnDatabase,
    retrievePlaceByIdFromDatabase, retrievePlaceByUserIdFromDatabase, updateExistingPlaceOnDatabase,
    deleteExistingPlaceFromDatabase
} = require("../database/services/place-service");

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

async function getPlaceById(req, res, next) {
    const placeId = req.params.pid

    const placeResponse = await retrievePlaceByIdFromDatabase(placeId);
    if (!placeResponse.success) {
        const httpError = new HttpError(placeResponse.message, placeResponse.httpStatusCode);
        return next(httpError);
    }

    res.status(placeResponse.httpStatusCode).json({place: placeResponse.result});
}

async function getPlacesByUserId(req, res, next) {
    const userId = req.params.uid
    const placesListResponse = await retrievePlaceByUserIdFromDatabase(userId);
    if (!placesListResponse.success) {
        const httpError = new HttpError(placesListResponse.message, placesListResponse.httpStatusCode);
        return next(httpError);
    }

    res.status(200).json(placesListResponse.result);
}

const DUMMY_IMAGE_SRC = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg'

async function createPlace(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {title, description, location, creatorId} = req.body;

    const createNewPlaceResponse = await createNewPlaceOnDatabase(title, description, location, DUMMY_IMAGE_SRC, creatorId);
    if (!createNewPlaceResponse.success) {
        const httpError = new HttpError(createNewPlaceResponse.message, createNewPlaceResponse.httpStatusCode);
        return next(httpError);
    }

    res.status(createNewPlaceResponse.httpStatusCode).json(createNewPlaceResponse.result);
}

async function updatePlace(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {title, description} = req.body;
    const placeId = req.params.pid;

    const placeUpdateResponse = await updateExistingPlaceOnDatabase(placeId, title, description);
    if (!placeUpdateResponse.success) {
        const httpError = new HttpError(placeUpdateResponse.message, placeUpdateResponse.httpStatusCode);
        return next(httpError);
    }

    res.status(placeUpdateResponse.httpStatusCode).json(placeUpdateResponse.result);
}

async function deletePlace(req, res, next) {
    const placeId = req.params.pid;
    const deletePlaceResponse = await deleteExistingPlaceFromDatabase(placeId);

    if (!deletePlaceResponse.success) {
        const httpError = new HttpError(deletePlaceResponse.message, deletePlaceResponse.httpStatusCode);
        return next(httpError);
    }

    res.status(deletePlaceResponse.httpStatusCode);
}

module.exports = {
    getPlaceById: getPlaceById,
    getPlacesByUserId: getPlacesByUserId,
    createPlace: createPlace,
    updatePlace: updatePlace,
    deletePlace: deletePlace
}
