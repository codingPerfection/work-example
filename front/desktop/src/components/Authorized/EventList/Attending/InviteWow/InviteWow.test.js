import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';


import InviteWow from './InviteWow';




describe("should test InviteWow component ", function () {

    let component;

    let chars = [
        { charName: 'Ralgioro' },{ charName: 'Namon' }
    ]

    let val = '/run InviteUnit("Ralgioro");InviteUnit("Namon");';


    step("Mount component", () => {
        component = mount(<InviteWow chars={[]} />);
    })


    step("returns null", () => {
        expect(component.children()).to.have.length(0);
    })

    step("set children", () => {
        component.setProps({ chars: chars });
        expect(component.children()).to.have.length(1);
    })

    step("doesn't exist paste plugin", () => {
        expect(component.find('#pastePlugin').exists()).to.equal(false)
    })

    step("correct input val to copy inside wow", () => {
        expect(component.find('input').props().value).to.equal(val)
    })




});