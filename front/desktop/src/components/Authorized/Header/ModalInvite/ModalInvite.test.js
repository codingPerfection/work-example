import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
//import {shallow} from 'enzyme';

import { request } from './../../../../helpers/Request';
import ModalInvite from './ModalInvite'




describe("should test ModalInvite component ", function () {

    let component;
    let reference;


    step("login as user", () => {
        return login.manager(true);
    })



    step("Mount Modal component", () => {
        component = mount(<ModalInvite data={true}  />);
    })


    step("should start loading", () => {
        component.instance().getUrl();
    })

    step("should show loading", () => {
        expect(component.state().loading).to.equal(true)
    })

    step("resolve api", () => {
        return request.waitForComponentsToGetDataFromApi();
    })

    step("stopped loading", () => {
        expect(component.state().loading).to.equal(false)
    })

    step("should not load again loading", () => {
        component.instance().getUrl();
        expect(component.state().loading).to.equal(false)
    })




});