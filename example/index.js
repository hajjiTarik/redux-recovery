import { createStore, applyMiddleware } from 'redux';
import ReTrace from 'redux-trace';
import ReduxRecover from '../src/index';
import { composeWithDevTools } from 'redux-devtools-extension';

function reducer(state = {}, action) {
  return state;
}

const reX = new ReduxRecover();
const reTrace = new ReTrace();

const store = createStore(reducer, {}, composeWithDevTools(
  applyMiddleware(reTrace.start, reX.start),
));
console.log(store.getState());
