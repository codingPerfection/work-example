import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../../tables';

import Event from './Events';

describe("should test Events/mapAttendsToUser ", function () {

    this.timeout(5000);
    let guildId = 1;
    let existingEvents = [];

    step("check the mapping", function () {
        let users = [{ id: 1, charName: "siljko" }, { id: 2, charName: "ralgioro" }];
        let attends = [{ userId: 6, late: true },{ userId: 1, late: true }]
        let e = new Event();
        let res = e.mapAttendsToUser(attends, users);
        expect(res).to.have.length(1);
        expect(res[0].charName).to.equal("siljko");
        expect(res[0].late).to.equal(true);
    });


});