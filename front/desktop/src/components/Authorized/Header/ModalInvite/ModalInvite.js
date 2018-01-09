import React from 'react';
import Modal from './../../../Common/Abstract/Modal/Modal';
import { request } from './../../../../helpers/Request';
import './ModalInvite.css'
import { userSettings } from '../../../../helpers/UserSettings';
import CopyBox from './../../../Common/CopyBox/CopyBox';



class ModalInvite extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }

    }

    getUrl() {
        if (!this.state.url) {
            this.setState({ loading: true });
            request.sendGet('guild/invite/', true).then((data) => {
                this.setState({ loading: false, url: data.url });
            })
        }
    }


    renderModalContent() {
        return (
            <div id="modalInvite">
                <div id="modalCancel" >
                    <h1>INVITE GUILDIES</h1>
                    <h2>
                        Give this link to your guildies so they could join {userSettings.guild} on impbot
                    </h2>
                    <CopyBox confirmed="Invite link copied to clipboard" text={this.state.url} />
                </div>
            </div>
        )
    }

}



export default ModalInvite;