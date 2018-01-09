import React, { Component } from 'react';
import './Login.css'
import { request } from './../../helpers/Request';
import EnterPhone from './EnterPhone/EnterPhone';
import EnterSmsCode from './EnterSmsCode/EnterSmsCode';
import { auth } from './../../helpers/Auth';
// react-native

// react-dom (what we'll use here)



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            enterPhone: true,
            accessToken: ''
        }
    }

    sendSmsConfirmation = (phone) => {
        this.setState({ loading: true, })
        return request.sendPut('login/needMobileToken', { phone: phone }).then((res) => {
            let state = { loading: false };
            if (res.invalidPhoneUser) {
                state.enterPhone = true;
                state.errorPhoneNumber = true;
                this.enterPhone.setError("User with that phone number doesn't exists");
            } else {
                state.accessToken = true;
                state.enterPhone = false;
                state.mobileToken = '';
                state.errorMobileToken = false;
                state.phone = phone;
            }
            this.setState(state);
        });
    }

    resendSms = () => {
        this.sendSmsConfirmation(this.state.phone).then(() => {
            this.enterSmsCode.reset();
        })
    }

    confirmSmsCode = (mobileToken) => {
        this.setState({ loading: true })
        request.sendPut('login/confirmMobileToken',
            {
                phone: this.state.phone,
                phoneToken: mobileToken
            }).then((res) => {
                let state = { loading: false };
                if (res.loginToken) {
                    auth.setAuthToken(res.loginToken);
                    this.props.done();
                } else {
                    this.enterSmsCode.setError('You have entered wrong sms code');
                    state.errorMobileToken = true;
                    this.setState(state);
                }
            });
    }




    getContent() {
        if (this.state.accessToken) {
            return (
                <div className="step2">
                    <div className="phoneNumber set" onClick={this.editPhone}>Phone: {this.state.phone}</div>
                    <EnterSmsCode
                        done={this.confirmSmsCode.bind(this)}
                        resendSms={this.resendSms.bind(this)}
                        ref={(enterSmsCode) => { this.enterSmsCode = enterSmsCode }}
                    />
                </div>
            )
        } else {
            return <EnterPhone done={this.sendSmsConfirmation.bind(this)} ref={(enterPhone) => { this.enterPhone = enterPhone; }} />
        }
    }

    render() {
        return (
            <div id="login" className="login flexContainer flexV">
                <div className="space"></div>
                <div className="content">
                    <h1>PLEASE LOGIN</h1>
                    {this.getContent()}
                </div>
                <div className="space"></div>
                <div className="aboutContainer">
                    <a className="aboutInfo" href="https://www.youtube.com/watch?v=jIoATkFHi00">What is impbots?</a>
                    <a className="aboutInfo" href="https://www.youtube.com/watch?v=jIoATkFHi00">Apply for impbots beta</a>
                </div>
            </div>
        )
    }

}

export default Login;
