// LICENSE : MIT
"use strict";
import {EventEmitter} from "events"
import {ACTION_KEY} from "./flux/ActionEmitter";
import ReducableStore from "./ReducableStore";
import {REDUCE_STORE_CHANGE_KEY} from "./ReducableStore"
const reduceStore = new ReducableStore();
const STORE_GROUPS_KEY = "__CHANGE__";
export default class StoreGroups extends EventEmitter {
    constructor(dispatcher) {
        super();
        this.dispatcher = dispatcher;
        this.dispatcher.onAction(this.dispatch.bind(this));
        this.stores = [reduceStore];
        this._onChange();
    }

    _onChange() {
        this.stores.forEach(store => {
            var pureEachEmitChange = this.emitChange.bind(this);
            store.on(REDUCE_STORE_CHANGE_KEY, pureEachEmitChange)
        });
    }

    // my change
    emitChange() {
        this.emit(STORE_GROUPS_KEY);
    }

    // must implement
    getState() {
        return Object.assign({}, reduceStore.getState());
    }

    onChange(changeHandler) {
        this.on(STORE_GROUPS_KEY, changeHandler);
    }

    dispatch(action) {
        const isChange = this.stores.forEach(store => {
            var prevState = store.getState();
            var newState = store.reduce(prevState, action);
            store.setState(newState);
            console.log(prevState, newState);
        });
        console.log(isChange ? "CHANGE" : "NO CHANGEE");
    }
}