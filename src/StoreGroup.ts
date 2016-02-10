// LICENSE : MIT
"use strict";
import * as assert from "assert";
import {EventEmitter} from "events"
import {Action} from "./Action";
import ActionEmitter from "./ActionEmitter";
// for typing
import ReduceStore from "./ReduceStore";
export const STORE_GROUPS_CHANGE = "__STORE_GROUPS_CHANGE__";
export const DISPATCH_BEFORE = "__DISPATCH_BEFORE__";
export const DISPATCH_AFTER = "__DISPATCH_AFTER__";
abstract class StoreGroup extends EventEmitter {
    private dispatcher:ActionEmitter;
    private stores:ReduceStore[];

    constructor(dispatcher:ActionEmitter) {
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

    /**
     * Return own collection of stores
     * @abstract subclass must implement
     */
    abstract getStores():ReduceStore[];


    /**
     * Return state of own stores
     * @abstract subclass must implement
     */
    abstract getState():void;

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

    /**
     * emit change event to this
     */
    emitChange():void {
        this.emit(STORE_GROUPS_CHANGE);
    }

    onChange(changeHandler:Function):Function {
        this.on(STORE_GROUPS_CHANGE, changeHandler);
        // unbind function
        return this.removeListener.bind(this, STORE_GROUPS_CHANGE, changeHandler);
    }

    /**
     * dispatch action to own's stores.
     * if any store has changed, will call `emitChange()`
     * @param action
     */
    dispatch(action:Action) {
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

export default StoreGroup;