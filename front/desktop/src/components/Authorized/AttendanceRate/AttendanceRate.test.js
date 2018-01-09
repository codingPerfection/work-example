import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';

import { request } from './../../../helpers/Request';
import AttendanceRate from './AttendanceRate';
import { attendanceStore } from "./AttendanceStore/AttendanceStore";




describe("should test AttendanceRate component ", function () {

    let component;

   
    step("login manager",()=>{
        return login.manager(true);
    })

    step("Mount component ", () => {
        component = mount(<AttendanceRate  />);
    })


    step("is loading", () => {
        expect(component.find('.mainLoader').exists()).to.equal(true);
    })

    step("wait for api", () => {
        return request.waitForComponentsToGetDataFromApi();
    });

    step("content shown", () => {
        component.update();
        expect(component.find('.mainLoader').exists()).to.equal(false);
        expect(component.find('.attendanceRateContent').exists()).to.equal(true);
    })

    step("manager info shown",()=>{
        expect(component.find('.managerInfo').exists()).to.equal(true);
    })

    step("open modalKick",()=>{
        let c = attendanceStore.all[0];
        attendanceStore.kickModal = c;
        component.update();
        component.find('#modalCloseButton').simulate("click",{});
    })

    step("modal is closed",()=>{
        expect(toJS(attendanceStore.kickModal)).to.equal(null);
    })

    step("open modal change role",()=>{
        let c = attendanceStore.all[0];
        attendanceStore.changeRoleModal = c;
        component.update();
        component.find('#modalCloseButton').simulate("click",{});
    })

    step("modal is closed",()=>{
        expect(toJS(attendanceStore.changeRoleModal)).to.equal(null);
    })

    step("login user",()=>{
        return login.user(true);
    })

    step("Mount component as user", () => {
        component = mount(<AttendanceRate  />);
    })

    step("wait for api", () => {
        return request.waitForComponentsToGetDataFromApi();
    });

    step("manager info not shown",()=>{
        expect(component.find('.managerInfo').exists()).to.equal(false);
    })
   
});