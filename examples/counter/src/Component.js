// LICENSE : MIT
"use strict";
import React from "react"
import ActionCreator from "./ActionCreator"
import ActionEmitter from "./../../src/flux/ActionEmitter"
import AppStateGroup from "./AppState";
var dispatcher = new ActionEmitter();
var action = new ActionCreator(dispatcher);
const appStateGroup = new AppStateGroup(dispatcher);
export default class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = appStateGroup.getState();
    }

    componentDidMount() {
        // <---- Observe store's change
        this.removeChangeListener = appStateGroup.onChange(() => {
            this._onChange();
        });
    }

    componentWillUnmount() {
        this.this.removeChangeListener()
    }

    // update state
    _onChange() {
        this.setState(appStateGroup.getState());
    }

    tick() {
        action.countUp(this.state.count + 1);
    }

    render() {
        // Call Action ----> ActionCreator
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