// LICENSE : MIT
"use strict";
import * as assert from "assert";
import {EventEmitter} from "events"
import ObjectAssign = require("object-assign");
import {Action} from "./Action";
export const REDUCE_STORE_CHANGE_KEY = "__REDUCE_STORE_CHANGE_KEY__";

abstract class ReduceStore extends EventEmitter {
    private state:any;

    constructor() {
        super();
        assert(typeof this.reduce === "function", "should implement `reduce(state:any, action:Action):any;`");
    }

    /**
     * state reduce function should return new state
     * @param state
     * @param {Action} action
     */
    abstract reduce(state:any, action:Action):any;

    /**
     * return state of store groups
     * @returns {Object}
     */
    getState() {
        assert(this.state, "should be defined state");
        return this.state;
    }

    /**
     * add change event handler and return unbind function.
     * @param onChangeHandler
     */
    onChange(onChangeHandler:Function) {
        this.on(REDUCE_STORE_CHANGE_KEY, onChangeHandler);
        return this.removeListener.bind(this, REDUCE_STORE_CHANGE_KEY, onChangeHandler);
    }

    /**
     * update state and emit change event.
     * @param state
     */
    setState(state:any) {
        this.state = ObjectAssign({}, this.state, state);
        this.emit(REDUCE_STORE_CHANGE_KEY);
    }
}

export default ReduceStore;