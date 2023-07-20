const Place = require("../models/place");
const User = require("../models/user");
const ServiceResponse = require("../../shared/service-response");
const mongoose = require("mongoose");

async function retrievePlaceByIdFromDatabase(placeId) {
    try {
        const place = await Place.findById(placeId);
        if (!place) {
            return ServiceResponse.error('Could not find a place for the provided id.', 404);
        }
        return ServiceResponse.success(place.toObject({getters: true}), 200);
    } catch (err) {
        return ServiceResponse.error('Something went wrong, could not find a place record.', 500);
    }
}

async function retrievePlaceByUserIdFromDatabase(creatorId) {
    try {
        const placesList = await Place.find({creatorId: creatorId});
        if (!placesList || placesList.length === 0) {
            return ServiceResponse.error('Could not find places for the provided user id.', 404);
        }
        const placesListWithGetters = placesList.map(place => place.toObject({getters: true}));
        return ServiceResponse.success({places: placesListWithGetters}, 200)
    } catch (err) {
        return ServiceResponse.error('Fetching places failed, please try again later', 500);
    }
}

async function createNewPlaceOnDatabase(title, description, location, image, creatorId) {
    const createdPlace = new Place({
        title,
        description,
        location: location,
        image: image,
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

        return ServiceResponse.success(createdPlace, 201);
    } catch (err) {
        return ServiceResponse.error('Creating place failed, please try again.', 500);
    }
}

async function updateExistingPlaceOnDatabase(placeId, title, description) {

    try {
        const place = await Place.findById(placeId);
        if (!place) {
            return ServiceResponse.error('Could not find a place for the provided id.', 404);
        }

        place.title = title;
        place.description = description;

        await place.save();
        return ServiceResponse.success({place: place.toObject({getters: true})}, 200);
    } catch (err) {
        return ServiceResponse.error('Something went wrong, could not update place.', 500);
    }
}

async function deleteExistingPlaceFromDatabase(placeId) {
    try {
        const place = await Place.findById(placeId).populate('creatorId');
        if (!place) {
            return ServiceResponse.error('Could not find a place for the provided id.', 404);
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
