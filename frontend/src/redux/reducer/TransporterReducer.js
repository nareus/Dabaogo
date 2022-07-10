import {
  CLEAR_FORM,
  DEPARTURE_TIME,
  RESTAURANT_VISIT,
} from '../action/TransporterAction';

const initialState = {
  isLoggedIn: false,
};

const transporterReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTAURANT_VISIT: {
      const {
        outletId,
        name,
        latitude,
        available,
        transporters,
        typeOfStore,
        longitude,
        imagePath,
      } = action.payload;
      return {
        outletId,
        name,
        latitude,
        available,
        transporters,
        typeOfStore,
        longitude,
        imagePath,
      };
    }
    case DEPARTURE_TIME: {
      return {
        isLoggedIn: false,
      };
    }
    case CLEAR_FORM: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default transporterReducer;
