import { createStore, applyMiddleware } from 'redux';
import ReduxRecover from '../src/index';

function reducer(state = {}, action) {
    return state;
}

const reX = new ReduxRecover();


const store = createStore(reducer, {}, applyMiddleware(reX.start));

console.log(store.getState());
store.dispatch({ type: 'toto' });

console.log(store.getState());