import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';

import { request } from './../../../../helpers/Request';
import CharType from './CharType';
import CharSingle from './../CharSingle/CharSingle';
import {attendanceStore} from './../AttendanceStore/AttendanceStore';




describe("should test CharType component ", function () {

    let component;
    let char = null;


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
        component = mount(<CharType data={attendanceStore.dps} />);
    })


    step("right number of children ", () => {
        expect(component.find(CharSingle).length).to.equal(attendanceStore.dps.users.length)
    })

  


});