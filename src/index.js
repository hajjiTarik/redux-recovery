import Storage from './libs/Storage';

export default class extends Storage {
  constructor(config = {
    recordAction: true,
    nbSavedActions: 2
  }) {
    super();
    this.persistActionType = 'PERSIST_STORE';
    this.recordAction = config.recordAction;
    this.nbSavedActions = config.nbSavedActions;
  }

  start = store => next => (action) => {
    const result = next(action);
    const currentState = store.getState();
    this.persistWithConditions(currentState, action);
    if (this.recordAction) {
      this.persistAction(action);
    }
    return result;
  };

  persistAction = action => {
    if (!action) return;
    console.log("action",this.getStorage('REDUX_RECOVER_ACTION'));
    const actionArray = this.getStorage('REDUX_RECOVER_ACTION') || [];

    if (actionArray.length == this.nbSavedActions) {
      actionArray.shift(action);
    } else {
      actionArray.push(action);
    }

    this.setStorage('REDUX_RECOVER_ACTION', actionArray.reverse());
  }

  persistWithConditions(currentState, action) {
    if (!currentState) return;

    if (action.type == this.persistActionType) {
      this.setStorage(currentState);
    }

    window.onbeforeunload = () => {
      this.setStorage('REDUX_RECOVER_STORE', currentState);
    }
  }
}
