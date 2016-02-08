// LICENSE : MIT
"use strict";
import {EventEmitter} from "events"
import ActionEmitter from "./ActionEmitter";
import assert from "assert";
const STORE_GROUPS_KEY = "__CHANGE__";
export default class StoreGroups extends EventEmitter {
    constructor(dispatcher) {
        super();
        // assert
        assert(dispatcher instanceof ActionEmitter, "should be instance of ActionEmitter");
        assert(typeof this.getStores === "function", "should implement `getStores(): ReduceStore[].");
        this.dispatcher = dispatcher;
        this.dispatcher.onAction(this.dispatch.bind(this));
        this.stores = this.getStores();
        this._setupOnChangeHandler();

    }

    _setupOnChangeHandler() {
        this.stores.forEach(store => {
            var pureEachEmitChange = this.emitChange.bind(this);
            store.onChange(pureEachEmitChange);
        });
    }

    // some store change
    emitChange() {
        // TODO: need queue of store for once dispatch
        this.emit(STORE_GROUPS_KEY);
    }

    // must implement
    getStores() {
        assert("should implement `getStores(): ReduceStore[] in " + this.constructor.name);
    }

    getState() {
        assert("should implement `getState(): any in " + this.constructor.name);
    }

    onChange(changeHandler) {
        this.on(STORE_GROUPS_KEY, changeHandler);
        // unbind function
        return this.removeListener.bind(this, STORE_GROUPS_KEY, changeHandler);
    }

    dispatch(action) {
        this.stores.forEach(store => {
            var prevState = store.getState();
            var newState = store.reduce(prevState, action);
            if (prevState !== newState) {
                store.setState(newState);
            }
        });
    }
}