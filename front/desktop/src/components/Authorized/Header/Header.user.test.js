import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
//import {shallow} from 'enzyme';

import { request } from './../../../helpers/Request';
import { auth } from './../../../helpers/Auth';
import Header from './Header'




describe("should test Header component ", function () {

    let component;


    step("login as user", () => {
        return login.user(true);
    })


    step("Mount Header component", () => {
        component = mount(<MemoryRouter initialEntries={['/']}><Header /></MemoryRouter>);
    })

    step("check correct links", () => {
        expect(component.find("#inviteLink").exists()).to.equal(false)
        expect(component.find("#quitGuildLink").exists()).to.equal(true)
    })

    step("click quit link", () => {
        let btn = component.find('#quitGuildLink');
        btn.simulate('click', {});
    })

    step("expect quit modal to be opened", () => {
        expect(component.find("Header").instance().state.modal).to.equal(true)
        expect(component.find("#modalQuitGuild").exists()).to.equal(true)
    })

    step("click close modal", () => {
        let btn = component.find(".closeModalContainer");
        btn.simulate('click', {});
    })
    
    step("expect quit modal to be closed", () => {
        expect(component.find("Header").instance().state.modal).to.equal(false)
        expect(component.find("#modalQuitGuild").exists()).to.equal(false)
    })

    step("logout", () => {
        component.find('.logout').simulate("click",{});
        expect(auth.isAuth()).to.equal(false);
    })


});