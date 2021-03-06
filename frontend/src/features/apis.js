import axios from 'axios';

var BASE_URL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:5000/apis';	
} else {
  BASE_URL = '/apis';	
}

const SEARCH_URL = `${BASE_URL}/search-recipe`;
const FILTER_URL = `${BASE_URL}/add-filters`;
const FAV_URL = `${BASE_URL}/add-fav`;
const LOGIN_URL = `${BASE_URL}/login`;
const FETCH_FAVS_URL = `${BASE_URL}/fetch-favs`;
const UNFAV_URL = `${BASE_URL}/unfav`;
const SAVE_URL = `${BASE_URL}/save`;
const FETCH_SAVED_URL = `${BASE_URL}/fetch-saved`;
const COMPLETE_URL = `${BASE_URL}/complete`;
const FETCH_COMPLETED_URL = `${BASE_URL}/fetch-completed`;
const UNSAVE_URL = `${BASE_URL}/unsave`;

const search = (ingdts) => axios.post(SEARCH_URL, {
  ingdts: ingdts,
});

const filter = (cuisine, mealType, diet, health, ingdts) => axios.post(FILTER_URL, {
  cuisine: cuisine,
  mealType: mealType,
  diet: diet,
  health: health,
  ingdts: ingdts,
});

const fav = (image, url, label, email) => axios.post(FAV_URL, {
  image: image,
  url: url,
  label: label,
  email: email,
});

const login = (email) => axios.post(LOGIN_URL, {
  email: email,
});

const getFavs = (email) => axios.post(FETCH_FAVS_URL, {
  email: email,
});

const unfav = (email, label) => axios.post(UNFAV_URL, {
  email: email,
  label: label,
});

const unsave = (email, label) => axios.post(UNSAVE_URL, {
  email: email,
  label: label,
})

const save = (image, url, label, email) => axios.post(SAVE_URL, {
  image: image,
  url: url,
  label: label,
  email: email,
});

const getSaved = (email) => axios.post(FETCH_SAVED_URL, {
  email: email,
});

const complete = (image, url, label, email) => axios.post(COMPLETE_URL, {
  image: image,
  url: url,
  label: label,
  email: email,
});

const getCompleted = (email) => axios.post(FETCH_COMPLETED_URL, {
  email: email,
});

const apis = { search, filter, fav, login, getFavs, unfav, save, getSaved, complete, getCompleted, unsave}
export default apis;