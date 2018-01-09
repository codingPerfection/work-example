import React, { Component } from 'react';
import { icon } from './../../../../helpers/Icon';
import { observer } from 'mobx-react';
import CharSingle from './../CharSingle/CharSingle';
import { userSettings } from './../../../../helpers/UserSettings';


class CharType extends Component {

    render() {
        return (
            <section>
                <div className="row info">
                    <div className="col1">
                        <h3>NAME:</h3>
                    </div>
                    <div className="col2">
                        <h3>ATTENDANCE RATE:</h3>
                    </div>
                    <div className="col3">
                        <h3>LATE RATE:</h3>
                    </div>
                    <div className="col4">
                        <h3>AVG LATE TIME:</h3>
                    </div>
                </div>
                <div className="row header notInfo">
                    <div className="col1">
                        {icon.getIcon(this.props.data.type, "icon")}
                        <span className="text">{this.props.data.type}</span>
                    </div>
                    <div className="col2">
                        <div className="text">{this.props.data.attendanceRate}</div>
                        <div className="fill" style={{ width: this.props.data.attendanceRate }}></div>
                    </div>
                    <div className="col3">
                        <div className="text">{this.props.data.lateRate}</div>
                        <div className="fill" style={{ width: this.props.data.lateRate }}></div>
                    </div>
                    <div className="col4">
                        {this.props.data.avgLateTime}
                    </div>
                </div>
                <div className=" headerSpacing">
                    <div className="row people notInfo">
                    </div>
                </div>
                {this.props.data.users.map(u => <CharSingle data={u} key={u.id} editable={userSettings.isManager} />)}
            </section>
        )
    }

}


export default observer(CharType);