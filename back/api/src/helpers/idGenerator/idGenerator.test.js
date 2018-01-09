import "mocha-steps";
import { expect } from 'chai';
import TablesNames from './../../../../tables';

import idGenerator from './idGenerator';

describe("should test idGenerator ", function () {



    step("wrong table name", function (done) {
        idGenerator('123').then((data)=>{
            done("shouldnt exist");
        }).catch((err) => {
            done();
        })
    });

    let id1;
    let id2;
    step("get first id", function (done) {
        idGenerator(TablesNames.guild).then((data)=>{
            id1 = data;
            done();
        }).catch((err) => {
            done("there was error updating id");
        })
    });

    step("get first id", function (done) {
        idGenerator(TablesNames.guild).then((data)=>{
            id2 = data;
            expect(parseInt(id2)).to.be.greaterThan(parseInt(id1));
            done();
        }).catch((err) => {
            done("there was error updating id");
        })
    });





});