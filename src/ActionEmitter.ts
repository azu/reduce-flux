// LICENSE : MIT
"use strict";
import {EventEmitter} from "events";
import {Action} from "./Action";
export const DISPATCH_ACTION = "__DISPATCH_ACTION__";
export default class ActionEmitter extends EventEmitter {
    /**
     * add onAction handler and return unbind function
     * @param {Function} cb
     * @returns {Function} return unbind function
     */
    onAction(cb:Function):Function {
        this.on(DISPATCH_ACTION, cb);
        return this.removeListener.bind(this, DISPATCH_ACTION, cb);
    }

    /**
     * dispatch action object.
     * StoreGroups receive this action and reduce state.
     * @param {Action} action
     */
    dispatch(action:Action) {
        this.emit(DISPATCH_ACTION, action);
    }
}