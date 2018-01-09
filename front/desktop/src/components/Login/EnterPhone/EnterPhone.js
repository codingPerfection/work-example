import React, { Component } from 'react';
import loader from './../../../img/loader.gif';


class EnterPhone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            err: false,
            phone: '',
        }
    }


    onPhoneChange = (e) => {
        this.setState({ phone: e.target.value , err: false})
    }

    sendSmsConfirmation = () => {
        this.setState({ loading: true });
        this.props.done(this.state.phone)
    }

    setError(err) {
        this.setState({ err: err, loading: false });
    }


    render() {
        if (this.state.loading) {
            return (
                <div className="loaderContainer">
                    <img src={loader} alt="loader" />
                </div>
            )
        } else {
            let errorMsg = null;
            if (this.state.err) {
                errorMsg = <div className="error">{this.state.err}</div>
            }
            return (
                <div>
                    <div className="msg">Enter your phone number:</div>
                    {errorMsg}
                    <input type="text" placeholder="+385989411056" value={this.state.phone} onChange={this.onPhoneChange} />
                    <button className="btn" onClick={this.sendSmsConfirmation}>SEND ME SMS</button>
                    <div className="explain">You will receive sms confirmation code</div>
                </div>
            )
        }
    }

}

export default EnterPhone;
