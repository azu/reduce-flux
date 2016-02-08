// LICENSE : MIT
"use strict";
import Emitter from "./flux/EventEmitter"
import assert from "assert";
export const REDUCE_STORE_CHANGE_KEY = "CHANGE";
class ReduceStore extends Emitter {
    getState() {
        assert(this.state, "should be defined state");
        return this.state;
    }

    setState(state) {
        this.state = Object.assign({}, this.state, state);
        this.emit(REDUCE_STORE_CHANGE_KEY);
    }
}
import {keys} from "./ActionCreator"

function countReducer(count = 0, action) {
    switch (action.type) {
        case keys.countUp:
            return action.count;
        default:
            return count;
    }
}
class Store extends ReduceStore {
    constructor() {
        super();
        this.state = {
            count: 0
        };
    }

    reduce(prevState, action) {
        return {
            count: countReducer(prevState.count, action)
        };
    }
}
export default Store;