import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';

import { request } from './../../../../../helpers/Request';
import ModalCancel from './ModalCancel';
import { eventsStore } from './../../EventsStore/EventsStore';




describe("should test ModalCancel component ", function () {

    let component;
    let openedEvent;


    step("login as manager", () => {
        return login.manager(true);
    });

    step("fetch events", () => {
        eventsStore.fetchEvents();
    });

    step("wait for api", () => {
        return request.waitForComponentsToGetDataFromApi();
    });


    step("Mount component ", () => {
        let event = eventsStore.events.find((e) => {
            return e.status === 'open';
        })
        component = mount(<ModalCancel data={event}  />);
    })

    step("click checkbox notify guildies", () => {
        component.find("#checkbox").simulate("click", {})
    })

    step("enter confirmation word", () => {
        const event = { target: { name: "input", value: 'cancel' } };
        let input = component.find('input');
        input.simulate('change', event);
        component.find(".submit").simulate("click", {})
    })

    step("modal is closed", () => {
        expect(component.state().loading).to.equal(true);
    })

    step("wait for api", () => {
        return request.waitForComponentsToGetDataFromApi();
    });

    step("update events store", () => {
        expect(toJS(eventsStore.cancelEventModal)).to.equal(null);
    })


    step("loading is false", () => {
        component.update();
        expect(component.state().loading).to.equal(false);
    })



});