import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  RESET_USER_DATA,
} from "./types";
import { getUserProfile } from "../../api/api";
import { reauthenticate } from "../../services/auth";
import { toast } from "react-toastify";

export const displayUserProfile =
  ({ userId }) =>
  async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });
    try {
      const userProfile = await getUserProfile({ userId });
      dispatch({ type: GET_PROFILE_SUCCESS, payload: userProfile });
    } catch (error) {
      toast.error("Something went wrong! Try again");
      dispatch({ type: GET_PROFILE_FAIL, payload: error.message });
    }
  };

export const resetUserData = () => (dispatch) => {
  dispatch({ type: RESET_USER_DATA });
};
