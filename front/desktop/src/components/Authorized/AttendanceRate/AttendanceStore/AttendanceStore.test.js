import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { extendObservable, toJS } from 'mobx';
//import {shallow} from 'enzyme';


import { attendanceStore } from './AttendanceStore';




describe("should test AttendanceStore component ", function () {

    let component;
    let char = null;



    step("calculate late time ", () => {
        let re = attendanceStore.calculateAverageLateTime({ lateTime: 10, late: 2 });
        expect(re.text).to.equal('5 min');
    })

    step("calculate late rate ", () => {
        let re = attendanceStore.calculateLateRate({ late: 1, yes: 1 });
        expect(re.percent).to.equal(50);
    })

    step("calculate late rate ", () => {
        let re = attendanceStore.calculateLateRate({ late: 0, yes: 0 });
        expect(re.percent).to.equal(0);
    })


    step("calculate attendance rate ", () => {
        let re = attendanceStore.calculateAttendanceRate({ late: 1, yes: 1, no: 1, pending: 1 });
        expect(re.percent).to.equal(50);
    })

    step("calculate attendance rate ", () => {
        let re = attendanceStore.calculateAttendanceRate({ late: 0, yes: 0, no: 0, pending: 0 });
        expect(re.percent).to.equal(0);
    })



});