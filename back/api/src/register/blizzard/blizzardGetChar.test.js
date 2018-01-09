import "mocha-steps";
import { expect } from 'chai';
import Tables from './../../../../tables';
import TestSettings from './../testSettings';

import getChar from './blizzardGetChar';

describe("should test blizzardGetChar ", function () {



    step("char shouldnt exist", function (done) {
        getChar('1314', 'eu/argent-dawn').catch((err) => {
            expect(err).to.equal("doesn't exists");
            done();
        })
    });

    step("server wrong format", function (done) {
        getChar('siljko', 'eu').catch((err) => {
            expect(err).to.equal("wrong server format");
            done();
        })
    });


    step("right data", function (done) {
        getChar(TestSettings.existingChar, TestSettings.server).then((data) => {
            expect(data.charName).to.equal('Siljko');
            expect(data.charClass).to.equal('demonHunter');
            done();
        })
    });



});