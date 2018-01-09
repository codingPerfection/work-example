import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';

import Attending from './Attending';




describe("should test Attending component ", function () {

    let component;

    let attends = [
        {
            charName: 'mirko', status: 'pending'
        },
        {
            charName: 'mirko1', status: 'pending'
        },
        {
            charName: 'siljko', status: 'yes'
        },
        {
            charName: 'siljko', status: 'no'
        },
        {
            charName: 'siljko', status: 'late', lateTime: '10'
        }
    ];

    step("login manger",()=>{
        login.manager();
    })

    step("Mount component ", () => {
        component = mount(<Attending attends={[]} />);
    })

    step("only updates info is shown ", () => {
        expect(component.find('.content').children().length).to.equal(1);
    })



    step("basic inspection", () => {
        component.setProps({attends: attends})
        expect(component.find('.content').children().length).to.be.at.least(3);
    })



});