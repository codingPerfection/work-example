import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import './List.css';
import { eventsStore } from './../EventsStore/EventsStore';
import Event from './Event/Event';




class List extends Component {

    render() {
        return (
            <div id="list">
                <div className="content">
                    {
                        eventsStore.events.map(e => <Event event={extendObservable(e,{
                            selected: e.selected
                        })} key={e.id} />)
                    }
                </div>
                
            </div>

        );
    }
}



export default List;