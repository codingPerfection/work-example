import React, { Component } from 'react';
import './Explanation.css';


class Explanation extends Component {


    render() {
        return (
            <div id="Explanation" className="attendingList">
                {this.props.notification ? (
                    <div className="notifactionInfo">
                        <h3>INFO:</h3>
                        <div className="breakDown ">
                            <div className="emptyMsg">
                                3h before event starts every person from the guild gets the sms with link to confirm their attendance to event.
                                At that point you can see here who is coming to event.
                            </div>
                        </div>
                    </div>
                ) : null}
                {this.props.updates ? (
                    <div className="updatesInfo">
                        <h3 className="attendingBreakdown addMargin">UPDATES INFO:</h3>
                        <div className="breakDown ">
                            <div className="emptyMsg">
                                Sry guys but you need to need to manually refresh the page to see updates to page, but no worries im hoping to make it auto-updating in next version.
                                <br />
                                <br />
                                Lok'tar ogar
                                <br />
                                Ralgioro
                        </div>
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default Explanation;
