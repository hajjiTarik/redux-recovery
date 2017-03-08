import Storage from './libs/Storage';
export default class storedRedux {
    constructor() {
        this.reStore = new Storage();
        this.devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
    }
    start = store => next => (action) => {
        const actionQueue = this.getReStore().actions || [];
        actionQueue.map((actionType) => {
            console.log(actionType.type, store.getState());
            this.devTools.send(actionType.type, store.getState());
        })
        actionQueue.push(next(action));

        this.reStore.setStore(store.getState(), 'actions', actionQueue);
    };
    getReStore = () => {
        return JSON.parse(this.reStore.getStore()) || {};
    }
}
