// LICENSE : MIT
"use strict";
import {EventEmitter} from "events";
import {Action} from "./Action";
export const DISPATCH_ACTION = "__DISPATCH_ACTION__";
export default class ActionEmitter extends EventEmitter {
    onAction(cb) {
        this.on(DISPATCH_ACTION, cb);
    }

    dispatch(action:Action) {
        this.emit(DISPATCH_ACTION, action);
    }
}