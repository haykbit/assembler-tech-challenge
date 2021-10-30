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

export async function getApiMemes() {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: "https://api.imgflip.com/get_memes",
  });
}

export async function uploadMemesData(meme, title) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/memes`,
    data: { meme, title },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getMemesData() {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/memes/all/`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
