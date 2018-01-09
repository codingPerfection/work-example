import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';

import { request } from './../../../../../helpers/Request';
import Event from './Event';
import { eventsStore } from './../../EventsStore/EventsStore';




describe("should test Event component ", function () {

    let component;
    let openedEvent;
    let notOpenedEvent;

    step("login as manager", () => {
        return login.manager(true);
    });

    step("fetch events", () => {
        eventsStore.fetchEvents();
    });

    step("wait for api", () => {
        return request.waitForComponentsToGetDataFromApi();
    });


    step("Mount Event component that is opened", () => {
        let event = eventsStore.events.find((e) => {
            return e.status === 'open';
        })
        openedEvent = extendObservable(event, { selected: event.selected });
        component = mount(<Event event={openedEvent} />);
    })

    step("responded exists", () => {
        expect(component.find('.respondedContainer').exists()).to.equal(true);
    })


    // step("manager buttons exists", () => {
    //     expect(component.find('.managerButtons').exists()).to.equal(true);
    // })

    // step("click button rename", () => {
    //     component.find("#btnOpenRename").simulate("click", {})
    // })

    // step("store filled with correct data", () => {
    //     expect(toJS(eventsStore.renameEventModal).id).to.deep.equal(toJS(openedEvent).id);
    // })

    // step("click button cancel", () => {
    //     component.find("#btnOpenCancelEvent").simulate("click", {})
    // })

    // step("store filled with correct data", () => {
    //     expect(toJS(eventsStore.cancelEventModal).id).to.deep.equal(toJS(openedEvent).id);
    // })

    step("Mount Event component that is not opened", () => {
        let event = eventsStore.events.find((e) => {
            return e.status !== 'open';
        })
        notOpenedEvent = extendObservable(event, { selected: event.selected });
        component = mount(<Event event={notOpenedEvent} />);
    })

    step("simulate click", () => {
        component.find('.event').simulate('click',{});
    })

    step("event is selected", () => {
        expect(notOpenedEvent.selected).to.equal(true);
    })

});