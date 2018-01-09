import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';


import SingleChar from './SingleChar';




describe("should test SingleChar component ", function () {

    let component;


    step("Mount component", () => {
        component = mount(<SingleChar char={{}} late="true" />);
    })


    step("is late", () => {
        expect(component.find('.charName').exists()).to.equal(true);
    })

    
    step("is not late", () => {
        component.setProps({late: false})
        expect(component.find('.charName').exists()).to.equal(false);
    })






});