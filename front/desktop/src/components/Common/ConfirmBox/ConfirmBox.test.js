import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
//import {shallow} from 'enzyme';

import ConfirmBox from './ConfirmBox'




describe("should test ConfirmBox ", function () {


    let component;

    let doneCalled = false;
    let done = () => {
        doneCalled = true;
    }

    step("Mount component", () => {
        component = mount(<ConfirmBox allValid={true} value={"test"} done={done} />);
    });


    step("input emtpy", () => {
        const event = { target: { name: "pollName", value: '' } };
        component.find('input').simulate('change', event);
        component.find('.submit').simulate('click', {});
    });

    step("error shown", () => {
        expect(component.find('.errorEmpty').exists()).to.equal(true)
    });

    step("val changed error hidden", () => {
        const event = { target: { name: "pollName", value: 'dsadas' } };
        component.find('input').simulate('change', event);
        component.find('.submit').simulate('click', {});
        expect(component.find('.errorEmpty').exists()).to.equal(false)
        expect(doneCalled).to.equal(true);
    });

    step("reset component to have explicit value",()=>{
        doneCalled = true;
        component.setProps({allValid: null, valid:'test'});
    })

    step("input wrong", () => {
        const event = { target: { name: "pollName", value: 'dsadads' } };
        component.find('input').simulate('change', event);
        component.find('.submit').simulate('click', {});
    });

    step("error shown", () => {
        expect(component.find('.errorInvalid').exists()).to.equal(true)
    });

    step("val changed error hidden", () => {
        const event = { target: { name: "pollName", value: 'test' } };
        component.find('input').simulate('change', event);
        component.find('.submit').simulate('click', {});
        expect(component.find('.errorInvalid').exists()).to.equal(false)
        expect(doneCalled).to.equal(true);
    });






});