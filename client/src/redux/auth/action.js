import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "../../services/auth";
import { getUserProfile, syncUserData } from "../../api/api";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_PROFILE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SIGN_OUT_SUCCESS,
  LOADING_OBSERVER,
  LOADING_OBSERVER_SUCCESS,
  LOADING_OBSERVER_FAIL,
  AUTH_RESET,
} from "./types";
import { toast } from "react-toastify";

export const authObserverLoading = () => (dispatch) => {
  try {
    dispatch({ type: LOADING_OBSERVER });
    return onAuthStateChanged((user) => {
      if (user) {
        const userProfile = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          uid: user.uid,
        };
        dispatch({ type: LOAD_PROFILE, payload: userProfile });
        dispatch({ type: LOADING_OBSERVER_SUCCESS });
        return user;
      } else {
        return null;
      }
    });
  } catch (error) {
    dispatch({ type: LOADING_OBSERVER_FAIL, payload: error.message });
  }
};

export const login = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const res = await signInWithGoogle();
    const accessToken = res.credential.accessToken;
    const userProfile = {
      firstName: res.additionalUserInfo.profile.given_name,
      lastName: res.additionalUserInfo.profile.family_name,
      email: res.additionalUserInfo.profile.email,
      uid: res.user.multiFactor.user.uid,
    };

    await syncUserData(userProfile);
    dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
    toast.success("You are successfully logged in");
    dispatch({ type: LOAD_PROFILE, payload: userProfile });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

export const registerWithEmailAndPassword =
  (email, password, user) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
      await signUpWithEmailAndPassword(email, password);

      const userProfile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: email,
      };

      dispatch({
        type: REGISTER_SUCCESS,
        payload: { ...user, email },
      });

      toast.success("You are successfully registered!");
      await syncUserData(userProfile);
      dispatch({ type: AUTH_RESET });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.message });
      toast.warn(error.message.split(":")[1].split(".")[0]);
    }
  };

export const loginWithEmailAndPassword =
  (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const res = await signInWithEmailAndPassword(email, password);
      const user = await getUserProfile(res.user.uid);

      const userProfile = {
        firstName: user.data.data.firstName,
        lastName: user.data.data.lastName,
        email: user.data.data.email,
        uid: user.data.data.firebase_id,
      };

      const accessToken = res.user.multiFactor.user.accessToken;

      dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
      dispatch({ type: LOAD_PROFILE, payload: userProfile });
      toast.success("You are successfully logged in");
      await syncUserData(userProfile);
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
      toast.error("Wrong Email or Password");
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({ type: SIGN_OUT_SUCCESS });
  toast.success("You are successfully logged out");
  await signOut();
};
