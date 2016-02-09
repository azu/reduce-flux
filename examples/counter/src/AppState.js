// LICENSE : MIT
"use strict";
/*

 AppState is inherited StoreGroups
 StoreGroups observer some store. it provide onChange function.

 */
import {EventEmitter} from "events"
import ReducableStore from "./CounterStore";
// store instances
const reduceStore = new ReducableStore();
import StoreGroups from "./../../src/flux/StoreGroups";
export default class AppState extends StoreGroups {
    // must implement
    getStores() {
        return [reduceStore];
    }

    getState() {
        return Object.assign({}, reduceStore.getState());
    }
}