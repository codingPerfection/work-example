import { extendObservable } from 'mobx';
import { request } from './../../../../helpers/Request';

class EventsStore {

    constructor() {
        extendObservable(this, {
            events: null,
            attends: null,
            cancelEventModal: null,
            renameEventModal: null,
        });
    }


    selectOpenedEvent(){
        let openedEvent = this.events.find(e => e.status !== 'pending');
        if (openedEvent) {
            this.setAttends(openedEvent);
        }else{
            this.setAttends(eventsStore.events[0]);
        }
    }

    fetchEvents() {
        this.isFetching = true;
        return request.sendGet('events/true/', true).then((data) => {
            this.events = data.events;
            this.selectOpenedEvent();
        });
    }

    cancelEvent = (e) => {
        return request.sendDelete('events/' + e.id + "/" + e.notify, true).then((data) => {
            this.cancelEventModal = null;
            this.events = data.events;
            this.selectOpenedEvent();
        })
    }

    renameEvent(event) {
        return request.sendPut('events/' + event.id, { name: event.name, renameEventScheduler: event.renameEventScheduler }, true).then((data) => {
            this.events.forEach(e => {
                if (e.id === event.id) {
                    e.name = event.name;
                }
                this.renameEventModal = null;
                this.selectOpenedEvent();
            });
        });
    }


    setAttends(event) {
        this.events.forEach(e => {
            if (e.id === event.id) {
                e.selected = true;
                this.attends = e.attends;
            } else {
                e.selected = false;
            }
        });
    }



}




export let eventsStore = new EventsStore();