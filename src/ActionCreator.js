// LICENSE : MIT
"use strict";
export const keys = {
    countUp: "countUp"
};
export default class ActionCreator {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    // "Emit" event ----> Store
    countUp(count) {
        this.dispatcher.dispatch({
            type: keys.countUp,
            count
        });
    }
}