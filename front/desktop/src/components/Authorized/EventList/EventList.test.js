import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';

import { request } from './../../../helpers/Request';
import EventList from './EventList';
import { eventsStore } from './EventsStore/EventsStore';




describe("should test EventList component ", function () {

    let component;

    step("login as manager", () => {
        return login.manager(true);
    });


    step("Mount component ", () => {
        component = mount(<MemoryRouter initialEntries={['/']}><EventList /></MemoryRouter>);
    })

    step("loader shown ", () => {
        expect(component.find('.mainLoader').exists()).to.equal(true)
    })


    step("wait for api", () => {
        return request.waitForComponentsToGetDataFromApi();
    });

    step("#eventlists exists loader hidden", () => {
        component.update();
        expect(component.find('#eventList').exists()).to.equal(true)
        expect(component.find('.mainLoader').exists()).to.equal(false)
    });


    // step("open rename modal", () => {
    //     component.find('#btnOpenRename').first().simulate('click');
    //     expect(component.find('#modal').exists()).to.equal(true);        
    // });

    // step("close modal", () => {
    //     component.find('#modalCloseButton').first().simulate('click');
    //     expect(component.find('#modal').exists()).to.equal(false);
    // });

    // step("open cancel modal", () => {
    //     component.find('#btnOpenCancelEvent').first().simulate('click');
    //     expect(component.find('#modal').exists()).to.equal(true);
    // });

    // step("close modal", () => {
    //     component.find('#modalCloseButton').first().simulate('click');
    //     expect(component.find('#modal').exists()).to.equal(false);
    // });



});