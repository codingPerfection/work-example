import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
//import {shallow} from 'enzyme';

import { request } from './../../../helpers/Request';
import Header from './Header'




describe("should test Header component ", function () {

    let component;


    step("login as manager", () => {
        return login.manager(true);
    })


    step("Mount Header component", () => {
        component = mount(<MemoryRouter initialEntries={['/']}><Header /></MemoryRouter>);
    })

    step("check correct links", () => {
        expect(component.find("#inviteLink").exists()).to.equal(true)
        expect(component.find("#quitGuildLink").exists()).to.equal(false)
    })

    step("click invite link", () => {
        let btn = component.find('#inviteLink');
        btn.simulate('click', {});
    })

    step("expect invite modal to be opened", () => {
        expect(component.find("Header").instance().state.modal).to.equal(true)
    })


    step("expect modal to show loading", ()=>{
        expect(component.find(".loaderContainer").exists()).to.equal(true)
    })

    step("wait for modal to get inv url", ()=>{
        return request.waitForComponentsToGetDataFromApi();
    })

    step("modal is loaded", ()=>{
        component.update();
        expect(component.find("#modalInvite").exists()).to.equal(true)
    })

    step("click close modal", () => {
        let btn = component.find(".closeModalContainer");
        btn.simulate('click', {});
    })
    
    step("expect quit modal to be closed", () => {
        expect(component.find("Header").instance().state.modal).to.equal(false)
        expect(component.find("#modalInvite").exists()).to.equal(false)
    })


});