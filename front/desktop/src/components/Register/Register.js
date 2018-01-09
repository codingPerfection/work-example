import React, { Component } from 'react';
import './Register.css'
import './../Login/Login.css'
import loader from './../../img/loader.gif';
import { request } from './../../helpers/Request';
import { auth } from './../../helpers/Auth';
import WowUser from './WowUser/WowUser';
import EnterPhone from './../Login/EnterPhone/EnterPhone'
import EnterSmsCode from './../Login/EnterSmsCode/EnterSmsCode'
// react-native

// react-dom (what we'll use here)



class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 'guild',
            code: this.props.code,
            loading: true,
        }
        request.sendGet('code/guild/' + this.props.code).then((data) => {
            this.setState({ loading: false, guild: data.guild });
            this.nextStep();
        })
    }

    characterSet(name) {
        this.setState({ charName: name });
        this.nextStep();
    }


    nextStep() {
        if (this.state.phone) {
            this.setState({ step: 'confirm' });
        } else if (this.state.charName) {
            this.setState({ step: 'phone' })
        } else {
            this.setState({ step: 'char' });
        }
    }

    sendSms = (phone) => {
        return request.sendPut('register/needMobileToken', {
            guildToken: this.state.code,
            phone: phone,
            charName: this.state.charName
        }).then((data) => {
            if (data.ok) {
                this.setState({ phone: phone });
                this.nextStep();
            } else {
                this.enterPhone.setError('invalid phone number');
            }
        })
    }

    finishRegistration = (token) => {
        return request.sendPut('register/confirmMobileToken', {
            guildToken: this.state.code,
            phone: this.state.phone,
            charName: this.state.charName,
            phoneToken: token,
        }).then((data) => {
            if (data.loginToken) {
                auth.setAuthToken(data.loginToken);
                this.props.done();
            } else {
                this.enterSmsCode.setError('Invalid sms code');
            }
        })

    }

    resendSms = () => {
        this.sendSms(this.state.phone).then((res) => {
            this.enterSmsCode.reset();
        });
    }

    getStep() {
        switch (this.state.step) {
            case 'guild':
                return (<div className="loaderContainer">
                    <img src={loader} alt="loader" />
                </div>)
            case 'char':
                return <WowUser done={this.characterSet.bind(this)} guildCode={this.state.code} />
            case 'phone':
                return <EnterPhone
                    done={this.sendSms.bind(this)}
                    ref={(ref) => { this.enterPhone = ref }} />
            case 'confirm':
                return <EnterSmsCode
                    resendSms={this.resendSms.bind(this)}
                    done={this.finishRegistration.bind(this)}
                    ref={(ref) => { this.enterSmsCode = ref }} />
        }
    }


    render() {
        return (
            <div id="register" className="login register flexContainer flexV">
                <div className="space"></div>
                <div className="content">
                    {this.state.guild ? <div className="guild">{this.state.guild}</div> : null}
                    <h1>REGISTRATION</h1>
                    <div className="setContainer">
                        {this.state.charName ? <div className=" set charName" onClick={() => { this.setState({ step: 'char' }) }}>Character: {this.state.charName}</div> : null}
                        {this.state.phone ? <div className=" set phone" onClick={() => { this.setState({ step: 'phone' }) }}>Phone: {this.state.phone}</div> : null}
                    </div>
                    {this.getStep()}
                </div>
                <div className="space"></div>
            </div>
        )
    }

}

export default Register;
