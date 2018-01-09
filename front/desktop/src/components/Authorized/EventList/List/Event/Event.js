import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { time } from './../../../../../helpers/Time';
import { icon } from './../../../../../helpers/Icon';
import { userSettings } from './../../../../../helpers/UserSettings';
import { eventsStore } from './../../EventsStore/EventsStore';




class Event extends Component {


    setAttends = () => {
        eventsStore.setAttends(this.props.event)
    }


    render() {
        let opened = null;
        if (this.props.event.status === 'open') {
            let total = this.props.event.attends.length;
            let responded = this.props.event.attends.filter(a => a.status !== "pending").length;
            let percent = Math.round(responded / total * 100) + "%";
            opened = (
                <div className="filled respondedContainer">
                    <div className="text">{responded}/{total} RESPONDED</div>
                    <div className="percent" style={{ "width": percent }}></div>
                </div>
            );
        }
        return (
            <div className="relative">
                <div onClick={() => this.setAttends()} className={'event' + (this.props.event.selected ? ' opened' : '')} >
                    <div className="in">{time.getIn(this.props.event.openTimezoned)}</div>
                    <div className="real">{time.getDay(this.props.event.openTimezoned)}, {time.getTime(this.props.event.openTimezoned)} - {time.getTime(this.props.event.closeTimezoned)}</div>
                    <div className="eventName">{this.props.event.name}</div>
                    {opened}
                    {icon.getUiIcon("arrowEvent", "openArrow")}
                </div>
                {/* {userSettings.isManager ? (
                    <div className="managerButtons" >
                        <span id="btnOpenRename" className="btn" onClick={() => { eventsStore.renameEventModal = this.props.event }} >{icon.getUiIcon('editPencilWhite', 'icon')} RENAME</span>
                        <span id="btnOpenCancelEvent" className="btn bottom" onClick={() => { eventsStore.cancelEventModal = this.props.event }}>{icon.getUiIcon('trashcanWhite', 'icon')} CANCEL</span>
                    </div>
                ) : null} */}
            </div>
        )
    }
}



export default observer(Event);