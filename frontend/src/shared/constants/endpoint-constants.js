const BASE_URL = "http://localhost:5000";

export const LOG_IN_ENDPOINT = `${BASE_URL}/api/users/log-in`;
export const SIGN_UP_ENDPOINT = `${BASE_URL}/api/users/sign-up`;
export const ALL_USERS_ENDPOINT = `${BASE_URL}/api/users`;
export const ADD_PLACES_ENDPOINT = `${BASE_URL}/api/places`;
export const USER_PLACES_ENDPOINT = (userId) => `${BASE_URL}/api/places/user/${userId}`;
export const MODIFY_PLACE_ENDPOINT = (placeId) => `${BASE_URL}/api/places/${placeId}`;
