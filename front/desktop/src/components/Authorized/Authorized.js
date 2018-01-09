import React, { Component } from 'react';
import loader from './../../img/loader.gif';
import { userSettings } from './../../helpers/UserSettings';
import { Route, Switch } from 'react-router-dom';
import './Authorized.css';
import Header from './Header/Header';
import EventList from './EventList/EventList';
import AttendanceRate from './AttendanceRate/AttendanceRate';
// react-native

// react-dom (what we'll use here)



class Authorized extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        userSettings.getUserSettings().then((data) => {
            this.setState({ loading: false, userSettings: data })
        })
    }


    getContent() {
        if (this.state.loading) {
            return (
                <div id="authorizedLoader" className="mainLoader flexContainer flexV">
                    <div className="space"></div>
                    <div className="content">
                        <div className="loaderContainer">
                            <img src={loader} alt="loader" />
                        </div>
                    </div>
                    <div className="space"></div>
                </div>
            )
        } else {
            return (
                <div className="heightFull flexContainer flexV">
                    <Header userSettings={this.state.userSettings} />
                    <Switch>
                        <Route exact path='/' >
                            <EventList />
                        </Route>
                        <Route exact path='/guild-overview' >
                            <AttendanceRate />
                        </Route>
                    </Switch>
                </div>
            )
        }
    }

    render() {
        return (
            <div id="content">
                {this.getContent()}
            </div>
        )
    }

}

export default Authorized;
