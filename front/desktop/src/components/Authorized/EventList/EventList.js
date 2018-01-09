import React, { Component } from 'react';
import { observer } from 'mobx-react';
import loader from './../../../img/loader.gif';
import { withRouter } from 'react-router-dom';
import List from './../EventList/List/List';
import Attending from './Attending/Attending'
import { eventsStore } from './EventsStore/EventsStore';
import ModalCancel from './List/ModalCancel/ModalCancel';
import ModalRename from './List/ModalRename/ModalRename';
import './EventList.css'


class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        eventsStore.fetchEvents().then(() => {
            this.setState({ loading: false });
        });
    }


    render() {
        if (this.state.loading) {
            return (
                <div className="mainLoader flexContainer flexV">
                    <div className="space"></div>
                    <div className="content">
                        <div className="loaderContainer">
                            <img src={loader} alt="loader" />
                        </div>
                    </div>
                    <div className="space"></div>
                </div>
            )
        } else {
            return (
                <div id="eventList" className="flexContainer flexH heightFull">
                    <List events={eventsStore.events} />
                    <Attending attends={eventsStore.attends} />
                    {/* <ModalCancel data={eventsStore.cancelEventModal} close={() => { eventsStore.cancelEventModal = null }} />
                    <ModalRename data={eventsStore.renameEventModal} close={() => { eventsStore.renameEventModal = null }} /> */}
                </div>
            )
        }
    }

}

export default withRouter(observer(EventList));
