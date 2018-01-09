import React, { Component } from 'react';
import { icon } from './../../../../helpers/Icon';
import { observer } from 'mobx-react';
import { attendanceStore } from '../AttendanceStore/AttendanceStore'

class CharSingle extends Component {

    constructor(props) {
        super(props);

        let total = 0;
        total += parseInt(this.props.data.yes, 10);
        total += parseInt(this.props.data.no, 10);
        total += parseInt(this.props.data.late, 10);
        total += parseInt(this.props.data.pending, 10);

        this.state = {
            total: total,
            edit: false,
        }
    }

    getContent() {
        if (this.state.edit) {
            return (<div className="col234 editableButtonsContainer">
                <div className="col2">
                    <div className="btn btnRole" onClick={() => { attendanceStore.changeRoleModal = this.props.data }}>CHANGE ROLE</div>
                </div>
                <div className="col3">
                    <div className="btn btnKick" onClick={() => { attendanceStore.kickModal = this.props.data }}>KICK GUILDIE</div>
                </div>
                <div className="col4">
                    <div className="btnClose" onClick={(e) => { this.setState({ edit: false }); e.stopPropagation(); }} >
                        {icon.getUiIcon("closeWhite", " icon")}
                    </div>
                </div>
            </div>
            )
        } else if (this.state.total === 0) {
            return (
                <div className="col234 notAttendedEventsWarning">
                    <div className="info">
                        <div className="text">Didn't have a chance to attend raid yet</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col234 hasAttendedEvent">
                    <div className="col2">
                        <div className="text">{this.props.data.attendanceRate}</div>
                        <div className="fill" style={{ width: this.props.data.attendanceRate }}></div>
                    </div>
                    <div className="col3">
                        <div className="text">{this.props.data.lateRate}</div>
                        <div className="fill" style={{ width: this.props.data.lateRate }}></div>
                    </div>
                    <div className="col4">
                        <span className="text">
                            {this.props.data.avgLateTime}
                        </span>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="peoplePadding">
                <div className={"row people notInfo " + (this.state.edit ? "editMode" : "")}
                    onClick={() => {
                        if (this.props.editable) {
                            this.setState({ edit: true })
                        }
                    }}>
                    <div className={"col1 " + (this.props.editable && !this.state.edit  ? "editable" : "")} >
                        {icon.getIcon(this.props.data.charClass, "icon")}
                        <div className="editIcon">
                            {icon.getUiIcon("editPencilWhite", "icon")}
                        </div>
                        <span className="text">{this.props.data.charName}</span>
                    </div>
                    {this.getContent()}

                </div>
            </div>
        )
    }

}


export default observer(CharSingle);