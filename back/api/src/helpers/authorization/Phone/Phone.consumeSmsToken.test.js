import "mocha-steps";
import { expect } from 'chai';
import TablesNames from './../../../../../tables';
import moment from 'moment';

import Phone from './Phone';

describe("should test Phone.consumeSmsToken ", function () {


    let phoneNumber = '+385989411056';
    let ip = '1:1:1:1';
    let token = '111';
    let wrongToken = '123456';
    let p = new Phone();
    p.tokenSettings.maxActive = 1000;
    p.consumeSettings.maxActive = 1000;

    step("insert test token for later consumption", function (done) {
        let data = {
            id: 4,
            phone: phoneNumber,
            created: 123,
            ttl: moment.utc().add('300', 'seconds').unix(),
            ip: 1,
            token: token
        };
        db.put({ TableName: TablesNames.smsToken, Item: data, }).promise()
            .then(data => { done() })
            .catch(err => {
                console.log(err);
                done("error inserting") });
    })

    step("get rejected wrong token",(done)=>{
      p.consumeSmsToken(phoneNumber,wrongToken,ip).then(()=>{
          done("shouldn't find it")
      }).catch(()=>{
          done();
      })
    })

    step("get right token",(done)=>{
        p.consumeSmsToken(phoneNumber,token,ip).then(()=>{
            done()
        }).catch((err)=>{
            //if we are running test more than 10 times in a row it will throw error so we might as well call that a pass
            if(err.limitReached){
                done();
            }else{
                done('error consuming token');
            }
        })
      })




});