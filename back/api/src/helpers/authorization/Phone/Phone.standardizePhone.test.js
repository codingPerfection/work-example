import "mocha-steps";
import { expect } from 'chai';
import TablesNames from './../../../../../tables';
import moment from 'moment';

import Phone from './Phone';

describe("should test Phone.standardizePhone ", function () {





    step("Phone correct format", function () {
        let p  = new Phone();
        let phone = "00385989411056"
        expect(p.standardizePhone(phone)).to.equal("+385989411056");
    })

    
    step("don't change format", function () {
        let p  = new Phone();
        let phone = "+385989411056"
        expect(p.standardizePhone(phone)).to.equal("+385989411056");
    })


});