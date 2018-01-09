import React, { Component } from 'react';
import loader from './../../../img/loader.gif';


class EnterSmsCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            err: false,
            mobileToken: '',
        }
    }


    onMobileTokenChange = (e) => {
        this.setState({ mobileToken: e.target.value, err: false })
    }

    confirmSmsCode = () => {
        this.setState({ loading: true });
        this.props.done(this.state.mobileToken)
    }

    resendSms = () => {
        this.setState({ loading: true });
        this.props.resendSms();
    }

    setError(err) {
        this.setState({ err: err, loading: false });
    }

    reset() {
        this.setState({ err: false, loading: false, mobileToken: '' });
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
                    <div className="msg">Enter SMS confirmation code:</div>
                    <div className="explain">Sms should arrive throught few minutes</div>
                    {errorMsg}
                    <input type="text" placeholder="123456" value={this.state.mobileToken} onChange={this.onMobileTokenChange} />
                    <button id="resendCode" className="btn" onClick={this.resendSms}>RESEND SMS</button>
                    <button className="btn btn2" onClick={this.confirmSmsCode}>CONFIRM CODE</button>
                </div>
            )
        }
    }

}

export default EnterSmsCode;
