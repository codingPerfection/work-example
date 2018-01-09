import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import Tables from './../../../../tables';

import EventCron from './EventCron';


describe("should test EventCron ", function () {

    this.timeout(5000);

    let currentTime = moment.utc().seconds(0);
    let ttl = currentTime.clone().add(300, "seconds").unix();


    step("insert eventCron 1", function () {
        let params = {
            TableName: Tables.eventCron,
            Item: {
                partition: 1,
                time: currentTime.unix(),
                ttl: ttl,
                eventClassId: 1,
                eventId: 1,
                topic: "open"
            }
        }
        return db.put(params).promise();
    });

    step("insert eventCron 2", function () {
        let params = {
            TableName: Tables.eventCron,
            Item: {
                partition: 1,
                time: currentTime.unix(),
                ttl: ttl,
                eventClassId: 2,
                eventId: 2,
                topic: "close"
            }
        }
        return db.put(params).promise();
    });

    step("insert eventCron 3", function () {
        let params = {
            TableName: Tables.eventCron,
            Item: {
                partition: 1,
                time: currentTime.unix(),
                ttl: ttl,
                eventClassId: 3,
                eventId: 3,
                topic: "archive"
            }
        }
        return db.put(params).promise();
    });

    step("insert eventCron 4", function () {
        let params = {
            TableName: Tables.eventCron,
            Item: {
                partition: 1,
                time: currentTime.unix(),
                ttl: ttl,
                eventClassId: 4,
                eventId: 4,
                topic: "close"
            }
        }
        return db.put(params).promise();
    });

    step("test publishing to topic without actually publishing for batchLimit = 1", function (done) {
        let e = new EventCron(currentTime.format());
        let publishes = [];
        e.batchLimit = 1;
        e.publishSns = (items) => {
            items.reduce((acc, item) => {
                publishes.push(item);
                return acc;
            }, publishes);
            return Promise.resolve();
        }
        e.check(currentTime.format()).then(() => {
            let single = publishes.find(p => p.eventId == 1);
            expect(single.topic).to.equal("open")
            single = publishes.find(p => p.eventId == 2);
            expect(single.topic).to.equal("close");
            single = publishes.find(p => p.eventId == 3);
            expect(single.topic).to.equal("archive")
            single = publishes.find(p => p.eventId == 4);
            expect(single.topic).to.equal("close")
            done();
        }).catch(err => {
            console.log(err);
            done("there was error");
        })
    });


    step("test check for emtpy response", function (done) {
        let e = new EventCron(1);
        let publishes = [];
        e.publishSns = (items) => {
            items.map((i) => {
                publishes.push(i);
            })
            return Promise.resolve();
        }
        e.check(currentTime.format()).then(() => {
            expect(publishes.length).to.equal(0)
            done();
        }).catch(err => {
            console.log(err);
            done("there was error");
        })
    });


    step("test check for error first try", function (done) {
        let e = new EventCron(1);
        let counter = 0;
        e.fetchBatch = (items) => {
            return Promise.reject();
        }
        e.check(currentTime.format()).then(() => {
            done("it passed while it should reject");
        }).catch(err => {
            done();
        })
    });


    step("test check for error first third try", function (done) {
        let e = new EventCron(1);
        let counter = 0;
        e.fetchBatch = () => {
            counter++;
            if (counter != 3) {
                return Promise.resolve(true);
            } else {
                return Promise.reject(true);
            }

        }
        e.check(currentTime.format()).then(() => {
            done("it passed while it should reject");
        }).catch(err => {
            expect(counter).to.equal(3);
            done();
        })
    });


    step("test fetchBatch() for error on query", function (done) {
        let e = new EventCron(1);
        e.fetchBatch("dsadsad", "Dsadsadsa", "dsadsadsa").then(() => {
            done("it passed while it should reject");
        }).catch(err => {
            done();
        })
    });


    step("test fetchBatch() for error on publishSns", function (done) {
        let e = new EventCron(1);
        e.publishSns = () => {
            return Promise.reject();
        }
        e.fetchBatch(1, 1, false).then(() => {
            done("it passed while it should reject");
        }).catch(err => {
            done();
        })
    });


    step("test publishSns() for empty", function (done) {
        let e = new EventCron(1);
        e.publishSns([]).then(() => {
            done();
        }).catch(err => {
            done("it threw error while it should pass");
        })
    });

    step("test publishSns() for error", function (done) {
        let e = new EventCron(1);
        e.publishSns([{ topic: 312 }]).then(() => {
            done("it passed while it should throw error");
        }).catch(err => {
            done();
        })
    });

    step("test publishSns() for pass", function (done) {
        let e = new EventCron(1);
        e.publishSns([{ topic: "close" },{ topic: "close" },{ topic: "close" },{ topic: "close" }]).then(() => {
            done();
        }).catch(err => {
            done("it passed while it should throw error");
        })
    });

});