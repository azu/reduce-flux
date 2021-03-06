// LICENSE : MIT
"use strict";
import {keys} from "./ActionCreator"
import ReduceStore from "./../../src/flux/ReduceStore";
// reduce function
export function countReducer(count = 0, action) {
    switch (action.type) {
        case keys.countUp:
            return action.count;
        default:
            return count;
    }
}
export default class CounterStore extends ReduceStore {
    constructor() {
        super();
        // initial state
        this.state = {
            count: 0
        };
    }

    // user implementation
    reduce(prevState, action) {
        return {
            count: countReducer(prevState.count, action)
        };
    }
}