import storage from './libs/Storage';
import * as CONSTANTES from './constantes';

const persistor = (recordAction = true, key) => {
  this.persistActionType = CONSTANTES.PERSIST_STORE;
  this.recordAction = recordAction;
  storage.initLocalStorage(key);
};

const persistWithConditions = (currentState, action) => {
  if (!currentState) return;

  if (action.type === this.persistActionType) {
    this.setStorage(currentState);
  }
};

export const start = store => next => (action) => {
  const result = next(action);
  const currentState = store.getState();
  persistWithConditions(currentState, action);
  if (this.recordAction) {
    this.persistAction(action);
  }
  return result;
};

const persistAction = (action) => {
  if (!action) return;
  const actionArray = this.getStorage('REDUX_RECOVER_ACTION') || [];

  actionArray = actionArray.length === this.nbSavedActions ? actionArray.shift(action) : action.push(action);
  storage.setStorage('REDUX_RECOVER_ACTION', actionArray.reverse());
};

export const purge = () => new Promise((resolve, reject) => {
  storage.clearStorage();
  resolve();
});
