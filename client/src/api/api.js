import axios from "axios";
import { getCurrentUserToken } from "../services/auth";

export async function syncUserData(user) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/users/login`,
    data: { user },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getUserProfile(id) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function updateUserProfile(id, profile, profileImage) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
    data: { ...profile, profileImage },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getSearchMeme() {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/users/memes`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function likeMeme(memeId, userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_API_BASE_URL}/memes/like/${memeId}`,
    data: { userId },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function cancelLikeMeme(memeId, userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_API_BASE_URL}/memes/cancel-like/${memeId}`,
    data: { userId },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getLikedMeme(id) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/users/myFavoriteMemes/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function removeMemeData(id, userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/meme/${id}`,
    data: { userId },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getSearchMeme(userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/memes/all/`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    data: { userId },
  });
}
