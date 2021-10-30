import { toast } from "react-toastify";
import {
  uploadMemesData,
  removeMemeData,
  getApiMemes,
  getMemesData,
} from "../../api/api";
import { uploadImages } from "../../services/cloudinary";
import {
  POST_MEME_REQUEST,
  POST_MEME_SUCCESS,
  POST_MEME_FAIL,
  GET_MEMES_REQUEST,
  GET_MEMES_SUCCESS,
  GET_MEMES_FAIL,
  GET_EXPLORE_MEMES_REQUEST,
  GET_EXPLORE_MEMES_SUCCESS,
  GET_EXPLORE_MEMES_FAIL,
  DELETE_MEME_REQUEST,
  DELETE_MEME_SUCCESS,
  DELETE_MEME_FAIL,
} from "./types";

export const uploadMemeFile = (meme, title) => async (dispatch) => {
  dispatch({ type: POST_MEME_REQUEST });
  try {
    const memeData = await uploadImages(meme);
    let createdMeme = await uploadMemesData(memeData.url, title);
    const { _id, owner } = createdMeme.data.data;
    toast.info("Successfully Uploaded");
    dispatch({ type: POST_MEME_SUCCESS });
  } catch (error) {
    toast.error("Something went wrong! Try again");
    dispatch({ type: POST_MEME_FAIL, payload: error.message });
  }
};

export const dispatchMemesData = () => async (dispatch) => {
  dispatch({ type: GET_MEMES_REQUEST });
  try {
    const meme = await getApiMemes();
    dispatch({ type: GET_MEMES_SUCCESS });
    return meme.data.data.memes;
  } catch (error) {
    toast.error("Something went wrong! Try again");
    dispatch({ type: GET_MEMES_FAIL, payload: error.message });
  }
};

export const dispatchExploreMemesData = () => async (dispatch) => {
  dispatch({ type: GET_EXPLORE_MEMES_REQUEST });
  try {
    const meme = await getMemesData();
    console.log("ACTION: ", meme);
    dispatch({ type: GET_EXPLORE_MEMES_SUCCESS });
    return meme.data.data;
  } catch (error) {
    toast.error("Something went wrong! Try again");
    dispatch({ type: GET_EXPLORE_MEMES_FAIL, payload: error.message });
  }
};
