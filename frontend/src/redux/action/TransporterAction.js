export const USER = '[USER]';
export const USER_LOGIN = `${USER} Set user as logged in`;
export const USER_LOGOUT = `${USER} Set user as logged out`;

export const RESTAURANT_VISIT = 'Restaurant To Visit';
export const DEPARTURE_TIME = 'Departure Time';
export const CLEAR_FORM = 'Clear FOrm';

export const setRestaurant = ({
  outletId,
  name,
  latitude,
  available,
  transporters,
  typeOfStore,
  longitude,
  imagePath,
}) => ({
  type: RESTAURANT_VISIT,
  payload: {
    outletId,
    name,
    latitude,
    available,
    transporters,
    typeOfStore,
    longitude,
    imagePath,
  },
});

export const setDepartureTime = ({departureTime}) => ({
  type: DEPARTURE_TIME,
  payload: {departureTime},
});

export const clearForm = () => ({
  tyoe: CLEAR_FORM,
  payload: {},
});
