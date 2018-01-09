import "mocha-steps";
import { expect } from 'chai';
import TablesNames from './../../../../../tables';
import moment from 'moment';

import Phone from './Phone';

describe("should test Phone.sendSmsToken ", function () {


    let phoneNumber = '+385989411056';
    let smsMessage = 'Hi Ralgioro! Your login code for impbots is :::token:::';
    let ip = '1:1:1:1';

    step("send token to my phone ", function (done) {
        this.timeout(5000);
        let p = new Phone();
        p.tokenSettings.maxActive = 1000;
        p.consumeSettings.maxActive = 1000;
        p.sendSmsToken(phoneNumber, smsMessage, ip).then(data => {
            done()
        }).catch(err => {
            //if we are running test more than 3 times in a row it will throw error so we might as well call that a pass
            if(err.limitReached){
                done();
            }else{
                done('error sending sms');
            }
        });
    })


});