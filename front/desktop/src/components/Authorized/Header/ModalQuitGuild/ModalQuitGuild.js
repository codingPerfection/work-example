import React from 'react';
import Modal from './../../../Common/Abstract/Modal/Modal';
import ConfirmBox from './../../../Common/ConfirmBox/ConfirmBox';
import { request } from './../../../../helpers/Request';
import { auth } from './../../../../helpers/Auth';
import './../../EventList/List/ModalCancel/ModalCancel.css';




class ModalQuitGuild extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    quitGuild() {
        this.setState({ loading: true });
        request.sendDelete('user/', true).then(() => {
            auth.logout();
        })
    }

    renderModalContent() {
        return (
            <div id="modalQuitGuild">
                <div id="modalCancel">
                    <h1>QUIT IMPBOT?</h1>
                    <div className="explain">
                        *This means you will stop receiving notifications about raid and your account will be deleted
                    </div>
                    <div className="question">
                        Are you sure that you want to quit impbot?
                </div>
                    <div className="instructions">
                        To quit impbot type "quit" inside box and press button
                    </div>
                    <ConfirmBox valid="quit" buttonName="QUIT IMPBOT" done={this.quitGuild.bind(this)} />
                </div>
            </div>
        )

    }

}



export default ModalQuitGuild;