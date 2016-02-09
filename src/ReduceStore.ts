// LICENSE : MIT
"use strict";
import * as assert from "assert";
import {EventEmitter} from "events"
import ObjectAssign = require("object-assign");
import {Action} from "./Action";
export const REDUCE_STORE_CHANGE_KEY = "__REDUCE_STORE_CHANGE_KEY__";

abstract class ReduceStore extends EventEmitter {
    private state:any;

    constructor(){
        super();
        assert(typeof this.reduce === "Function", "should implement `reduce(state:any, action:Action):any;` in ");
        
    }
    abstract reduce(state:any, action:Action):any;

    getState() {
        assert(this.state, "should be defined state");
        return this.state;
    }

    onChange(onChangeHandler:Function) {
        this.on(REDUCE_STORE_CHANGE_KEY, onChangeHandler);
    }

    setState(state:any) {
        this.state = ObjectAssign({}, this.state, state);
        this.emit(REDUCE_STORE_CHANGE_KEY);
    }
}

export default ReduceStore;