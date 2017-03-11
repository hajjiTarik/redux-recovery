import { createStore, applyMiddleware } from 'redux';
import ReduxRecover from '../src/index';
import { composeWithDevTools } from 'redux-devtools-extension';

function reducer(state = {}, action) {
  return state;
}

const reX = new ReduxRecover();

const store = createStore(reducer, {}, composeWithDevTools(
  applyMiddleware(reX.start),
));
store.dispatch({type : 'start'});
console.log(store.getState());
