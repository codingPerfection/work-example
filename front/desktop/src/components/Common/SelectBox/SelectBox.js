import React, { Component } from 'react';
import './SelectBox.css';


class SelectBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.default ? props.default : '',
            error: false,
        }
    }

    valueChanged = (val) => {
        this.setState({ value: val, error: false, errorNoValue: false })
    }

    getSelected() {
        return this.state.value;
    }



    render() {
        return (
            <div id="selectBox">
                {this.props.options.map((e) => {
                    return (
                        <div className="container"  key={e.value}>
                            <div onClick={() => { this.valueChanged(e.value) }}
                                className={this.state.value === e.value ? "selected" : ""}
                                >
                                {e.html}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default SelectBox;
