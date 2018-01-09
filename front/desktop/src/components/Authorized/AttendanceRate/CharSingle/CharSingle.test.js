import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';

import { request } from './../../../../helpers/Request';
import CharSingle from './CharSingle';
import {attendanceStore} from './../AttendanceStore/AttendanceStore';




describe("should test CharSingle component ", function () {

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
        char  = attendanceStore.all[0];
        char.yes = 1;
        component = mount(<CharSingle data={char} editable={true}  />);
    })

    step("rendered the right content",()=>{
        expect(component.find('.hasAttendedEvent').exists()).to.equal(true);
    })

    step("setup attendance store",()=>{
        attendanceStore.kickModal = null;
        attendanceStore.changeRoleModal = null;
        expect(component.find('.editMode').exists()).to.equal(false);
    })


    step("enter edit mode",()=>{
        component.find('.people').simulate("click",{});
        expect(component.find('.editMode').exists()).to.equal(true);
        expect(component.instance().state.edit).to.equal(true);
        expect(component.find('.editableButtonsContainer').exists()).to.equal(true);
    });

    step("open kick modal",()=>{
        component.find('.btnKick').simulate("click",{});
        expect(toJS(attendanceStore.kickModal)).to.not.equal(null);
    });


    step("open change role modal",()=>{
        component.find('.btnRole').simulate("click",{});
        expect(toJS(attendanceStore.changeRoleModal)).to.not.equal(null);
    });

    step("exit edit mode", ()=>{
        component.find('.btnClose').simulate('click',{});
        expect(component.find('.editMode').exists()).to.equal(false);
        expect(component.instance().state.edit).to.equal(false);
        expect(component.find('.editableButtonsContainer').exists()).to.equal(false);
    })

    step("mount component with 0 attends",()=>{
        char.yes = 0;
        char.no = 0;
        char.pending = 0;
        char.late = 0;
        component = mount(<CharSingle data={char} editable={false}  />);
    });

    step("is render not attended events",()=>{
        expect(component.find('.notAttendedEventsWarning').exists()).to.equal(true);
    });

    step("cannot enter edit mode if not editable",()=>{
        component.find('.people').simulate("click",{});
        expect(component.instance().state.edit).to.equal(false);
    });


});