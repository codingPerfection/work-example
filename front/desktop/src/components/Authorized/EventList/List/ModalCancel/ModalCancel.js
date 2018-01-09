import React from 'react';
import Modal from './../../../../Common/Abstract/Modal/Modal';
import CheckBox from './../../../../Common/Checkbox/Checkbox';
import ConfirmBox from './../../../../Common/ConfirmBox/ConfirmBox';
import { eventsStore } from './../../EventsStore/EventsStore';
import './ModalCancel.css';
import { time } from './../../../../../helpers/Time';




class ModalCancel extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    cancelEvent() {
        this.setState({ loading: true });
        eventsStore.cancelEvent({ ...this.props.data, notify: this.checked.getValue() }).then(() => {
            this.setState({ loading: false })
        });
    }

    renderModalContent() {
        return (
            <div id="modalCancel" >
                <h1>CANCEL EVENT : {this.props.data.name} (FOR THIS WEEK)?</h1>
                <h2>Event being held: {time.getDay(this.props.data.openTimezoned)}, {time.getTime(this.props.data.openTimezoned)} - {time.getTime(this.props.data.closeTimezoned)}</h2>
                <div className="check">
                    <CheckBox checked={false} ref={(ref) => { this.checked = ref }} />
                    <span className="text"> Notify guildies by sms </span>
                </div>
                <div className="explain">
                    *This means guildies will get sms explaining them that event has been canceled (for this week)
                    </div>
                <div className="question">
                    Are you sure that you want to cancel event (for this week)?
                    </div>
                <div className="instructions">
                    To cancel event (for this week) type "cancel" in the box and press button
                    </div>
                <ConfirmBox valid="cancel" buttonName="CANCEL EVENT" done={this.cancelEvent.bind(this)} />
            </div>
        )

    }

}



export default ModalCancel;