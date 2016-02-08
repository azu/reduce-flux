// LICENSE : MIT
"use strict";
import EventEmitter from "./EventEmitter";
export const ACTION_KEY = "_____ACTION________";
export default class ActionEmitter extends EventEmitter {
    onAction(cb) {
        this.on(ACTION_KEY, cb);
    }

    dispatch(action) {
        this.emit(ACTION_KEY, action);
    }
}