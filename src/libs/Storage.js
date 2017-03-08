export default class Storage {
    constructor(storeKey = '__redux_store') {
        if (typeof (window) === 'undefined') return;

        this.storage = window.localStorage;
        this.storeKey = storeKey;
        this.initLocalStore();
    }

    initLocalStore = () => {
        if (this.storage.getItem(this.storeKey)) return;

        this.storage.setItem(this.storeKey, JSON.stringify({}));
    }
    setStore = (currentState, type, actionArray) => {
        if (!currentState) return;
        if (!type) {
            this.storage.setItem(this.storeKey, JSON.stringify(currentState));
        } else {
            this.storage.setItem(this.storeKey, JSON.stringify({ ...currentState, actions: actionArray }));
        }
    }
    getStore = () => {
        return this.storage.getItem(this.storeKey);
    }
    clearStore = () => {
        this.storage.removeItem('__redux_store');
    }
}
