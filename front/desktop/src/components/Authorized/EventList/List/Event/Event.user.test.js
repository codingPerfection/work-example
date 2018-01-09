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

    step("login as user", () => {
        return login.user(true);
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


    step("manager buttons dont exists", () => {
        expect(component.find('.managerButtons').exists()).to.equal(false);
    })


});