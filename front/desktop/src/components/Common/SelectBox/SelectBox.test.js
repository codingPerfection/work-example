import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
//import {shallow} from 'enzyme';

import SelectBox from './SelectBox'




describe("should test CopyBox ", function () {


    let component;



    step("Mount component", () => {
        component = mount(<SelectBox  options={[{ value: '1', html: (<div className="first"></div>) }, { value: '2', html: (<div className="second"></div>) }]} />);
    });

    step("1 selected", () => {
        component.find('.first').simulate('click', {});
        expect(component.instance().getSelected()).to.equal('1');
        expect(component.find('.selected').exists()).to.equal(true)
    });


    step("Mount component with default value", () => {
        component = mount(<SelectBox default={'1'} options={[{ value: '1', html: (<div className="first"></div>) }, { value: '2', html: (<div className="second"></div>) }]} />);
    });

    step("1 selected", () => {
        expect(component.instance().getSelected()).to.equal('1');
    });

});