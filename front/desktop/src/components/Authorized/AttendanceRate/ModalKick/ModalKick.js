import React from 'react';
import Modal from './../../../Common/Abstract/Modal/Modal';
import ConfirmBox from './../../../Common/ConfirmBox/ConfirmBox';
import CharSingle from './../CharSingle/CharSingle';
import { attendanceStore } from './../AttendanceStore/AttendanceStore'
import './../../EventList/List/ModalCancel/ModalCancel.css';
import { observer } from 'mobx-react';
import './ModalKick.css';



class ModalKick extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    kickGuildie() {
        this.setState({ loading: true });
        attendanceStore.kickGuildie(this.props.data).then(()=>{
            this.setState({ loading: false})
            this.props.close();
        })

    }

    renderModalContent() {
        return (
            <div id="modalKick">
                <div id="modalCancel" >
                    <h1>KICK GUILDIE : {this.props.data.charName}</h1>
                    <h2>
                        Are you sure that you want to kick {this.props.data.charName}?
                </h2>
                    <div className="explain">
                        *This means guildie will stop receiving notifications about raid and his account his account on impbot will be deleted
                    </div>
                    <div className="container">
                        <CharSingle data={this.props.data} />
                    </div>
                    <div className="instructions">
                        To kick guildie type "kick" inside box and press button
                    </div>
                    <ConfirmBox valid="kick" buttonName="KICK GUILDIE" done={this.kickGuildie.bind(this)} />
                </div>
            </div>
        )

    }

}



export default observer(ModalKick);