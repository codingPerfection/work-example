import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
//import {shallow} from 'enzyme';

import { auth } from './../../helpers/Auth';
import { request } from './../../helpers/Request';
import Authorized from './Authorized'




describe("should test Authorized component ", function () {

    let component;

    login.manager();

    step("Mount Authorized component", () => {
        component = mount(<MemoryRouter initialEntries={['/']}><Authorized /></MemoryRouter>);
    })

    step("loader shown", () => {
        expect(component.find('#authorizedLoader').exists()).to.equal(true);
    })

    step("resolve request", () => {
        return request.waitForComponentsToGetDataFromApi();
    })

    step("loader hidden", () => {
        component.update();
        expect(component.find('#authorizedLoader').exists()).to.equal(false);
    })

    step("header shown", () => {
        expect(component.find('#mainHeader').exists()).to.equal(true);
    })
    

    step("logout",()=>{
        auth.logout();
        expect(auth.isAuth()).to.equal(false);
    })


});