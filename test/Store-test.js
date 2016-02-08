// LICENSE : MIT
"use strict";
import assert from "power-assert"
import Store from "../src/CounterStore"
import {keys} from "../src/ActionCreator";
import ActionEmitter from "../src/flux/ActionEmitter";
describe("Store", function () {
    describe("onCountUp", function () {
        it("should emit `CHANGE` event", function () {
            const store = new Store();
            var expectedCount = 42;
            var newState = store.reduce(store.getState(), {
                type: keys.countUp,
                count: expectedCount
            });
            assert.equal(newState.count, expectedCount);
        });
    });
});