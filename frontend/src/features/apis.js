import axios from 'axios';

var BASE_URL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:5000/apis';	
} else {
  BASE_URL = '/apis';	
}

const SEARCH_URL = `${BASE_URL}/search-recipe`;

const search = (ingdts) => axios.post(SEARCH_URL, {
  ingdts: ingdts,
});

const apis = { search}
export default apis;