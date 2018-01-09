import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';


import StatusBreakdown from './StatusBreakdown';




describe("should test StatusBreakdown component ", function () {

    let component;


    step("Mount component", () => {
        component = mount(<StatusBreakdown char={{}} late="true" chars={[]} empty="empty" />);
    })


    step("empty msg exists", () => {
        expect(component.find('.emptyMsg').exists()).to.equal(true);
    })


    step("wrapper has correct class", () => {
        expect(component.find('.lateView').exists()).to.equal(true);
    })






});