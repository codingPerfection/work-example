import React, { Component } from 'react';
import loader from './../../../img/loader.gif';
import { request } from './../../../helpers/Request';
// react-native

// react-dom (what we'll use here)



class RegisterGuild extends Component {

    constructor(props) {
        super(props);
        this.state = {
            charName: '',
        }
    }

    onCharNameChange = (e) => {
        this.setState({ charName: e.target.value, error: false })
    }

    checkCharName = () => {
        this.setState({ loading: true });
        request.sendGet('character/check/' + this.state.charName+"/"+this.props.guildCode).then((data) => {
            if (data.exists) {
                this.props.done(data.charName);
            } else {
                this.setState({ loading: false, error: true })
            }
        });
    }

    render() {
        return (
            <div id="wowUser">
                {this.state.loading ? (
                    <div className="loaderContainer">
                        <img src={loader} alt="loader" />
                    </div>
                ) : (
                        <div>
                            <div className="msg">What is your character name?</div>
                            {this.state.error ? (<div className="error">We couldn't find a character with that name</div>) : null}
                            <input value={this.state.charName} onChange={this.onCharNameChange} />
                            <div>
                                <button className="btn" onClick={this.checkCharName}>SUBMIT</button>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

}

export default RegisterGuild;
