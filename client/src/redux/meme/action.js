import { toast } from "react-toastify";
import { uploadMemesData, removeMemeData, getApiMemes } from "../../api/api";

import {
  POST_MEME_REQUEST,
  POST_MEME_SUCCESS,
  POST_MEME_FAIL,
  GET_MEMES_REQUEST,
  GET_MEMES_SUCCESS,
  GET_MEMES_FAIL,
  DELETE_MEME_REQUEST,
  DELETE_MEME_SUCCESS,
  DELETE_MEME_FAIL,
} from "./types";

export const uploadMemeFile = (meme, metadata) => async (dispatch) => {
  dispatch({ type: POST_MEME_REQUEST });
  try {
    let createdMeme = await uploadMemesData(meme);
    const { _id, owner } = createdMeme.data.data;
    toast.info("Successfully Uploaded");
    dispatch({ type: POST_MEME_SUCCESS });
  } catch (error) {
    toast.error("Something went wrong! Try again");
    dispatch({ type: POST_MEME_FAIL, payload: error.message });
  }
};

export const deleteMeme = (memeId, userId) => async (dispatch) => {
  dispatch({ type: DELETE_MEME_REQUEST });
  try {
    await removeMemeData(memeId, userId);
    toast.info("Successfully Deleted");
    dispatch({ type: DELETE_MEME_SUCCESS });
  } catch (error) {
    toast.error("Something went wrong! Try again");
    dispatch({ type: DELETE_MEME_FAIL, payload: error.message });
  }
};

export const dispatchMemesData = () => async (dispatch) => {
  dispatch({ type: GET_MEMES_REQUEST });
  try {
    const meme = await getApiMemes();
    dispatch({ type: GET_MEMES_SUCCESS });
    const data = { meme };
    return data;
  } catch (error) {
    toast.error("Something went wrong! Try again");
    dispatch({ type: GET_MEMES_FAIL, payload: error.message });
  }
};
