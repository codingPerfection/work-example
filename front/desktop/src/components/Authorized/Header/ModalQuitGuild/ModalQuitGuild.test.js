import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
//import {shallow} from 'enzyme';

import { request } from './../../../../helpers/Request';
import { auth } from './../../../../helpers/Auth';
import ModalQuitGuild from './ModalQuitGuild'




describe("should test ModalQuitGuild component ", function () {

    let component;

    let closed = () => {

    }

    step("login as user", () => {
        return login.user(true);
    })


    step("Mount Modal component", () => {
        component = mount(<ModalQuitGuild data={true} close={closed} />);
    })

    step("enter correct input", ()=>{
        const event = { target: { name: "input", value: 'quit' } };
        let input = component.find('input');
        input.simulate('change', event);
    });

    step("click", ()=>{
        component.find('.submit').simulate('click');
    });

    step("wait for api to finish", ()=>{
        return request.waitForComponentsToGetDataFromApi();
    });

    step("user is logout", ()=>{
        expect(auth.isAuth()).to.equal(false);
    });

});