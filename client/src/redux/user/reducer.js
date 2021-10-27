import INITIAL_STATE from "./state";
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  RESET_USER_DATA,
} from "./types";

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        userProfile: null,
        loading: true,
        error: null,
        getUserProfileSuccess: false,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
        error: null,
        getUserProfileSuccess: true,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        userProfile: null,
        loading: false,
        error: action.payload,
        getUserProfileSuccess: false,
      };

    case RESET_USER_DATA:
      return {
        ...state,
        userProfile: null,
        profileUpdated: false,
      };
    default:
      return { ...state };
  }
};

export default reducer;
