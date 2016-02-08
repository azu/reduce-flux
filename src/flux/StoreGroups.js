// LICENSE : MIT
"use strict";
import {EventEmitter} from "events"
import ActionEmitter from "./ActionEmitter";
import assert from "assert";
const STORE_GROUPS_KEY = "__CHANGE__";
// TODO: should be public
const DISPATCH_BEFORE = "__DISPATCH_BEFORE__";
const DISPATCH_AFTER = "__DISPATCH_AFTER__";
export default class StoreGroups extends EventEmitter {
    constructor(dispatcher) {
        super();
        // assert
        assert(dispatcher !== undefined, "should initialize with ActionEmitter");
        assert(dispatcher instanceof ActionEmitter, "should be instance of ActionEmitter");
        assert(typeof this.getStores === "function", "should implement `getStores(): ReduceStore[].");
        this.dispatcher = dispatcher;
        this.dispatcher.onAction(this.dispatch.bind(this));
        this.stores = this.getStores();
        this._setupOnChangeHandler();

    }

    _setupOnChangeHandler() {
        let isChanged = false;
        const onChange = () => {
            isChanged = true;
        };
        const afterChange = () => {
            if (isChanged) {
                this.emitChange();
            }
            isChanged = false;
        };
        this.stores.forEach(store => {
            store.onChange(onChange);
        });
        this.on(DISPATCH_AFTER, () => {
            afterChange();
        });
    }

    // some store change
    emitChange() {
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
        this.emit(DISPATCH_BEFORE);
        this.stores.forEach(store => {
            var prevState = store.getState();
            var newState = store.reduce(prevState, action);
            if (prevState !== newState) {
                store.setState(newState);
            }
        });
        this.emit(DISPATCH_AFTER);
    }
}