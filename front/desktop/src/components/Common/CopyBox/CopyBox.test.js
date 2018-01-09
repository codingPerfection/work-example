import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
//import {shallow} from 'enzyme';

import CopyBox from './CopyBox'




describe("should test CopyBox ", function () {


    let component;



    step("Mount component", () => {
        component = mount(<CopyBox confirmed="copied text" text="mytext" />);
    });

    step("copeid msg doesnt exists", () => {
        expect(component.find('.confirmMsg').exists()).to.equal(false);
    })

    step("copeid msg doesnt exists", () => {
        expect(component.find('.confirmMsg').exists()).to.equal(false);
    })


    step("click copy", () => {
        component.find('.btn').simulate("click", {});
    })

    
    step("copy msg shown", () => {
        expect(component.find('.confirmMsg').exists()).to.equal(true)
    })




});