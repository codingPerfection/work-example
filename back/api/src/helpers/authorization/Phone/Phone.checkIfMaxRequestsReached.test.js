import "mocha-steps";
import { expect } from 'chai';
import TablesNames from './../../../../../tables';
import moment from 'moment';

import Phone from './Phone';

describe("should test Phone.checkIfMaxRequestsReached ", function () {


    let phoneNumber = '+111';
    let blockingPhoneNumber = '+222';
    let ids = [1, 2];


    let insertData = (ids, phoneNumber, done) => {
        let count = 0;
        let ttl = moment.utc().add(300, 'seconds').unix();
        let created = moment.utc().subtract(50, 'seconds').unix();
        ids.map((id) => {
            let current = moment
            let data = {
                id: id,
                phone: phoneNumber,
                created: created,
                ttl: ttl,
                ip: 1,
                token: '1'
            };
            db.put({ TableName: TablesNames.smsToken, Item: data, },
                (err, data) => {
                    if (data) {
                        count++;
                        if (count === ids.length) {
                            done();
                        }
                    } else {
                        done('error inserting data')
                    }
                });
        })
    }

    step("insert 2 tokens ", function (done) {
        insertData(ids, phoneNumber, done);
    });

    step("check with phone that it doesn't block", (done) => {
        let p = new Phone();
        p.checkIfMaxRequestsReached(TablesNames.smsToken, phoneNumber, 3).then(data => { done() }).catch(err => done("too much"));
    })

    step("set 3 tokens ", function (done) {
        ids.push(3);
        insertData(ids, blockingPhoneNumber, done);
    });

    step("it should block now", (done) => {
        let p = new Phone();
        p.checkIfMaxRequestsReached(TablesNames.smsToken, blockingPhoneNumber, 3).then(data => { done("should block and it doesn't block") }).catch(err => done());
    })

    step("check that error also rejects", (done) => {
        let p = new Phone();
        p.checkIfMaxRequestsReached(null, blockingPhoneNumber, 3).then(data => { done('resolved but should error instead') }).catch(err => { done(); })
    })


});