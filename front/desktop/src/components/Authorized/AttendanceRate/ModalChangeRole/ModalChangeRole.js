import React from 'react';
import Modal from './../../../Common/Abstract/Modal/Modal';
import SelectBox from './../../../Common/SelectBox/SelectBox';
import CharSingle from './../CharSingle/CharSingle';
import { icon } from './../../../../helpers/Icon';
import { attendanceStore } from './../AttendanceStore/AttendanceStore'
import { settings } from './../../../../Settings'
import { observer } from 'mobx-react';
import './../../../Common/ConfirmBox/ConfirmBox.css';
import './../../EventList/List/ModalCancel/ModalCancel.css';
import './../ModalKick/ModalKick.css';
import './ModalChangeRole.css';


class ModalChangeRole extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    changeRole() {
        this.setState({ loading: true });
        attendanceStore.changeRole(this.props.data, this.select.getSelected()).then(() => {
            this.setState({ loading: false})
            this.props.close();
        })
    }

    renderModalContent() {
        return (
            <div id="modalChangeRole">
                <div id="modalCancel" >
                    <h1>CHANGE ROLE OF : {this.props.data.charName}</h1>
                    <h2>
                        Are you sure that you want to Change role of: {this.props.data.charName}?
                    </h2>
                    <div className="container">
                        <CharSingle data={this.props.data} />
                    </div>
                    <div className="instructions">
                        To change role press role icon and than press save button
                    </div>
                    <SelectBox default={this.props.data.charType}
                        ref={(ref) => { this.select = ref }}
                        options={settings.charTypes.map(e => { return { value: e, html: icon.getIcon(e, "icon") } })} />
                    <div id="confirmBox">
                        <div className="submit" onClick={() => { this.changeRole() }}>SAVE</div>
                    </div>
                </div>
            </div>
        )

    }

}



export default observer(ModalChangeRole);