import INITIAL_STATE from "./state";

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

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_MEME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        memeData: action.payload,
        uploadMemeSuccess: false,
        uploadMemeLoading: true,
      };
    case POST_MEME_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadMemeSuccess: true,
        error: null,
        memeData: null,
        uploadMemeLoading: false,
      };
    case POST_MEME_FAIL:
      return {
        ...state,
        loading: false,
        uploadMemeSuccess: false,
        error: action.payload,
        memeData: null,
        uploadMemeLoading: false,
      };
    case GET_MEMES_REQUEST:
      return {
        ...state,
        getMemesSuccess: false,
        loading: true,
        error: null,
      };
    case GET_MEMES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        getMemesSuccess: true,
      };
    case GET_MEMES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        getMemesSuccess: false,
      };
    case GET_EXPLORE_MEMES_REQUEST:
      return {
        ...state,
        getMemesSuccess: false,
        loading: true,
        error: null,
      };
    case GET_EXPLORE_MEMES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        getMemesSuccess: true,
      };
    case GET_EXPLORE_MEMES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        getMemesSuccess: false,
      };
    case DELETE_MEME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        deleteMemeSuccess: false,
        memeData: null,
      };
    case DELETE_MEME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deleteMemeSuccess: true,
        memeData: null,
      };
    case DELETE_MEME_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        deleteMemeSuccess: false,
        memeData: null,
      };
    default:
      return { ...state };
  }
};

export default reducer;
