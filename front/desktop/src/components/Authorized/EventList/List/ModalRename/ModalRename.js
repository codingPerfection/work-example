import React from 'react';
import Modal from './../../../../Common/Abstract/Modal/Modal';
import CheckBox from './../../../../Common/Checkbox/Checkbox';
import ConfirmBox from './../../../../Common/ConfirmBox/ConfirmBox';
import { eventsStore } from './../../EventsStore/EventsStore';
import './../ModalCancel/ModalCancel.css'
import './ModalRename.css';
import { time } from './../../../../../helpers/Time';




class ModalRename extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    renameEvent(inputValue) {
        this.setState({ loading: true });
        eventsStore.renameEvent({ ...this.props.data, renameEventScheduler: this.checked.getValue(), name: inputValue }).then(() => {
            this.setState({ loading: false })
        });
    }

    renderModalContent() {
        return (
            <div id="modalRename" >
                <div id="modalCancel">
                    <h1>RENAME EVENT: {this.props.data.name}</h1>
                    <h2>Event being held: {time.getDay(this.props.data.openTimezoned)}, {time.getTime(this.props.data.openTimezoned)} - {time.getTime(this.props.data.closeTimezoned)}</h2>
                    <div className="check">
                        <CheckBox checked={false} ref={(ref) => { this.checked = ref }} />
                        <span className="text"> Also rename all events generated in future </span>
                    </div>
                    <div className="explain">
                        *This means that all future events held at {time.getdayOfWeek(this.props.data.openTimezoned)} {time.getTime(this.props.data.openTimezoned)} - {time.getTime(this.props.data.closeTimezoned)} will have the new name you set
                    </div>
                    <div className="question">
                        Enter new event name:
                    </div>
                    <div className="instructions">
                        <ConfirmBox allValid={true} default={this.props.data.name} buttonName="RENAME EVENT" done={this.renameEvent.bind(this)} />
                    </div>
                </div>
            </div>
        )

    }

}



export default ModalRename;