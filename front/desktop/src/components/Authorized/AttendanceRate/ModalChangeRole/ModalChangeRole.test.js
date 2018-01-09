import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';

import { request } from './../../../../helpers/Request';
import ModalChangeRole from './ModalChangeRole';
import { attendanceStore } from './../AttendanceStore/AttendanceStore';




describe("should test ModalChangeRole component ", function () {

    let component;
    let isClosed = false;
    let close = ()=>{
        isClosed = true;
    }


    step("login as manager", () => {
        return login.manager(true);
    });

    step("fetch attends", () => {
        attendanceStore.fetchAttends();
    });

    step("wait for api", () => {
        return request.waitForComponentsToGetDataFromApi();
    });


    step("Mount component ", () => {
        let char = attendanceStore.all.find((c) => c.id === '1111')
        component = mount(<ModalChangeRole data={char} close={close} />);
    })


    step("click tank ", () => {
        component.find('.container div').last().simulate('click', {});
    })

    step("click save ", () => {
        component.find('.submit').simulate('click', {});
    })

    step("is loading ", () => {
        expect(component.instance().state.loading).to.equal(true);
    })

    step("resolve request ", () => {
        return request.waitForComponentsToGetDataFromApi();
    })

    step("is finished loading ", () => {
        expect(component.instance().state.loading).to.equal(false);
    })

    step("we have a tank ", () => {
        expect(attendanceStore.tank.users.length).to.equal(2);
    })

});