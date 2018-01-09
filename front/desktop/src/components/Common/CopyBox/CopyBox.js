import React, { Component } from 'react';
import './CopyBox.css';


class CopyBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false,
        }
    }


    componentDidMount() {
        /* istanbul ignore next */
        if (this.props.multiline) {
            this.input.style.height = this.input.scrollHeight + "px"
        }
    }

    copyCliboard = () => {
        this.input.select();
        /* istanbul ignore next */
        if (document && document.execCommand) {
            document.execCommand('copy');
        }
        this.setState({ copied: true });
    }

    render() {
        return (
            <div id="copyBox">
                <div className="copyContainer">
                    <div className="btn" onClick={this.copyCliboard}>COPY</div>
                    {this.props.multiline ? (
                        <textarea readOnly="true"
                            className="text"
                            ref={(ref) => { this.input = ref }}
                            onFocus={
                                /* istanbul ignore next */
                                (e) => {
                                    e.target.select()
                                }
                            }>{this.props.text}</textarea>
                    ) : (
                            <input ref={(ref) => { this.input = ref }}
                                value={this.props.text}
                                onFocus={
                                    /* istanbul ignore next */
                                    (e) => {
                                        e.target.select()
                                    }
                                } readOnly="true"
                                className="text"
                            />
                        )}
                </div>
                {this.state.copied ? <div className="confirmMsg"> {this.props.confirmed} </div> : null}
            </div >
        )
    }

}

export default CopyBox;
