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

const search = (ingdts) => axios.post(SEARCH_URL, {
  ingdts: ingdts,
});

const filter = (cuisine, mealType, ingdts) => axios.post(FILTER_URL, {
  cuisine: cuisine,
  mealType: mealType,
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

const apis = { search, filter, fav, login, getFavs, unfav}
export default apis;