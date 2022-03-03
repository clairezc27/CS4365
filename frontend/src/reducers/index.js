import { combineReducers } from 'redux';

import recipeReducer from '../features/recipe';

const rootReducer = combineReducers({
  recipe: recipeReducer,
});

export default rootReducer;