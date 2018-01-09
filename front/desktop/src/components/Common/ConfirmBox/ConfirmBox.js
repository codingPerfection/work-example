import React, { Component } from 'react';
import './ConfirmBox.css';


class ConfirmBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.default ? props.default : '',
            error: false,
        }
    }

    valueChanged = (e) => {
        this.setState({ value: e.target.value, error: false, errorNoValue: false })
    }

    sendValue = () => {
        if (this.props.allValid) {
            if (this.state.value.trim().toLowerCase() === '') {
                this.setState({ errorNoValue: true });
            }else{
                this.props.done(this.state.value);
            }
        } else {
            let val = this.state.value.trim().toLowerCase();;
            if (val === this.props.valid.toLowerCase()) {
                this.props.done();
            } else {
                this.setState({ error: true })
            }
        }
    }


    render() {
        return (
            <div id="confirmBox">
                {this.state.error ? (
                    <div className="error errorInvalid">
                        You need to enter "{this.props.valid}" inside box
                    </div>
                ) : null}
                {this.state.errorNoValue ? (
                    <div className="error errorEmpty">
                        This field can not be empty
                    </div>
                ) : null}
                <input placeholder={this.props.valid} value={this.state.value} onChange={this.valueChanged} />
                <div className="submit" onClick={this.sendValue}>{this.props.buttonName}</div>
            </div>
        )
    }

}

export default ConfirmBox;
