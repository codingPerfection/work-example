import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';


import Explanation from './Explanation';




describe("should test Explanation component ", function () {

    let component;
    let updates = false;
    let notifications = false;

    step("Mount component", () => {
        component = mount(<Explanation notification={notifications} updates={updates} />);
    })

    step("none of the messages exist", () => {
        expect(component.find('.notifactionInfo').exists()).to.equal(false);
        expect(component.find('.updatesInfo').exists()).to.equal(false);
    })

    step("notification exists", () => {
        component.setProps({ notification: true });
        expect(component.find('.notifactionInfo').exists()).to.equal(true);
        expect(component.find('.updatesInfo').exists()).to.equal(false);
    })

    step("updates exists", () => {
        component.setProps({ updates: true });
        expect(component.find('.notifactionInfo').exists()).to.equal(true);
        expect(component.find('.updatesInfo').exists()).to.equal(true);
    })


});