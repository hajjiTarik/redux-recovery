export default class Storage {
  constructor() {
    if (typeof (window) === 'undefined') return;

    this.storage = window.localStorage;
    this.storeKey = "REDUX_RECOVER";
    this.initLocalStorage();
  }

  initLocalStorage = () => {
    const store = `${this.storeKey}_STORE`;
    const action = `${this.storeKey}_ACTION`;

    if (this.storage.getItem(store) ||
        this.storage.getItem(action) ) return;

    this.storage.setItem(store, null);
    this.storage.setItem(action, null);
  }

  setStorage = (key = this.storeKey,  data) => {
    console.log("key",key, "data",data);
    this.storage.setItem(key, JSON.stringify(data));
  }

  getStorage = (key = this.storeKey) => {
    const store = this.storage.getItem(key);
    return JSON.parse(store);
  }

  clearStorage = () => {
    this.storage.removeItem(this.storeKey);
  }
}
