// LICENSE : MIT
"use strict";
import Emitter from "./EventEmitter"
import assert from "assert";
export const REDUCE_STORE_CHANGE_KEY = "__REDUCE_STORE_CHANGE_KEY__";
export default class ReduceStore extends Emitter {
    getState() {
        assert(this.state, "should be defined state");
        assert(typeof this.reduce, "should implement reduce(state, action) method");
        return this.state;
    }

    onChange(onChangeHandler) {
        this.on(REDUCE_STORE_CHANGE_KEY, onChangeHandler);
    }

    setState(state) {
        this.state = Object.assign({}, this.state, state);
        this.emit(REDUCE_STORE_CHANGE_KEY);
    }
}
