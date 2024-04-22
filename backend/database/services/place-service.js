const Place = require("../models/place");
const User = require("../models/user");
const ServiceResponse = require("../../shared/service-response");
const mongoose = require("mongoose");
const fs = require("fs");

async function retrievePlaceByIdFromDatabase(placeId) {
    try {
        const place = await Place.findById(placeId);
        if (!place) {
            return ServiceResponse.error('Could not find a place for the provided id.', 404);
        }
        return ServiceResponse.success({place: place.toObject({getters: true})}, 200);
    } catch (err) {
        return ServiceResponse.error('Something went wrong, could not find a place record.', 500);
    }
}

async function retrievePlaceByUserIdFromDatabase(creatorId) {
    try {
        const placesList = await Place.find({creatorId: creatorId});
        if (!placesList) {
            return ServiceResponse.error('Could not find places for the provided user id.', 404);
        }
        if (placesList.length === 0) {
            return ServiceResponse.success({places: []}, 200)
        }
        const placesListWithGetters = placesList.map(place => place.toObject({getters: true}));
        return ServiceResponse.success({places: placesListWithGetters}, 200)
    } catch (err) {
        return ServiceResponse.error('Fetching places failed, please try again later', 500);
    }
}

async function createNewPlaceOnDatabase(title, description, imageBase64, location, creatorId) {
    const createdPlace = new Place({
        title,
        description,
        imageBase64,
        location,
        creatorId
    });

    try {
        const user = await User.findById(creatorId);
        if (!user) {
            return ServiceResponse.error('Could not find user for provided id.', 404);
        }

        //Started a session to run tasks sequentially. i.e the place creation and the update of user places with the newly created one
        const createPlaceSession = await mongoose.startSession();
        createPlaceSession.startTransaction();

        await createdPlace.save({session: createPlaceSession});
        user.places.push(createdPlace);
        await user.save({session: createPlaceSession});

        await createPlaceSession.commitTransaction();

        return ServiceResponse.success({place: createdPlace}, 201);
    } catch (err) {
        console.log(err);
        return ServiceResponse.error('Creating place failed, please try again.', 500);
    }
}

async function updateExistingPlaceOnDatabase(userId, placeId, title, description) {

    try {
        const place = await Place.findById(placeId);
        if (!place) {
            return ServiceResponse.error('Could not find a place for the provided id.', 404);
        }

        if (place.creatorId.toString() !== userId.toString()) {
            return ServiceResponse.error('You are not authorized to edit this place.', 401);
        }

        place.title = title;
        place.description = description;

        await place.save();
        return ServiceResponse.success({place: place.toObject({getters: true})}, 200);
    } catch (err) {
        return ServiceResponse.error('Something went wrong, could not update place.', 500);
    }
}

async function deleteExistingPlaceFromDatabase(placeId, userId) {
    try {
        const place = await Place.findById(placeId).populate('creatorId');
        if (!place) {
            return ServiceResponse.error('Could not find a place for the provided id.', 404);
        }

        if (place.creatorId._id.toString() !== userId.toString()) {
            return ServiceResponse.error('You are not authorized to delete this place.', 401);
        }

        //Started a session to run tasks sequentially. i.e the place deletion and unlink it from the creator based on his id
        const deleteSession = await mongoose.startSession();
        deleteSession.startTransaction();

        await place.deleteOne({session: deleteSession});
        place.creatorId.places.pull(place);
        await place.creatorId.save({session: deleteSession});

        await deleteSession.commitTransaction();
        return ServiceResponse.success({message: "Place Deleted Successfully!"}, 204);
    } catch (err) {
        return ServiceResponse.error('Something went wrong, could not delete place.', 500);
    }
}

module.exports = {
    createNewPlaceOnDatabase,
    retrievePlaceByIdFromDatabase,
    retrievePlaceByUserIdFromDatabase,
    updateExistingPlaceOnDatabase,
    deleteExistingPlaceFromDatabase
}
