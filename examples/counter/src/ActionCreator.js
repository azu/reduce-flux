// LICENSE : MIT
"use strict";
export const keys = {
    countUp: "countUp"
};
export default class ActionCreator {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    // emit Action event ----> Store
    countUp(count) {
        this.dispatcher.dispatch({
            type: keys.countUp,
            count
        });
    }
}