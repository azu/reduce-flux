// LICENSE : MIT
"use strict";
import React from "react"
import ActionCreator from "./ActionCreator"
import ActionEmitter from "./flux/ActionEmitter"
import StoreGroup from "./StoreGroups";
var dispatcher = new ActionEmitter();
var action = new ActionCreator(dispatcher);
const storeGroup = new StoreGroup(dispatcher);
export default class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = storeGroup.getState();
        // <- Observe store's change
        storeGroup.onChange(() => {
            this._onChange();
        });
    }

    _onChange() {
        this.setState(storeGroup.getState());
    }

    tick() {
        action.countUp(this.state.count + 1);
    }

    render() {
        return (
            <div>
                <button onClick={this.tick.bind(this)}>Count Up</button>

                <p>
                    Count: {this.state.count}
                </p>
            </div>
        );
    }
}