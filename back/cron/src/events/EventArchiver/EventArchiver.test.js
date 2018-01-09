import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import Tables from './../../../../tables';

import EventArchiver from './EventArchiver';

describe("should test EventArchiver ", function () {

    this.timeout(5000);

    let guildId = 3;
    let eventId = 2;

    step("insert event", function () {
        let params = {
            TableName: Tables.event,
            Item: {
                id: eventId,
                guildId: guildId,
                historyStatus: "false",
                open: 1,
                close: 1,
                openTimezoned: "1231",
                closeTimezoned: "123",
                status: "closed"
            }
        }
        return db.put(params).promise();
    });

    step("insert users", () => {
        var params = { RequestItems: {} };
        params.RequestItems[Tables.user] = [
            {
                PutRequest: {
                    Item: {
                        id: 1,
                        guildId: guildId,
                        attendance: {
                            yes: 1,
                            no: 0,
                            pending: 0,
                            late: 0,
                            lateTime: 0,
                        }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        id: 2,
                        guildId: guildId,
                        attendance: {
                            yes: 0,
                            no: 1,
                            pending: 0,
                            late: 0,
                            lateTime: 0,
                        }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        id: 3,
                        guildId: guildId,
                        attendance: {
                            yes: 0,
                            no: 1,
                            pending: 2,
                            late: 0,
                            lateTime: 0
                        }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        id: 4,
                        guildId: guildId,
                        attendance: {
                            yes: 0,
                            no: 0,
                            pending: 0,
                            late: 1,
                            lateTime: 30,
                        }
                    }
                }
            }
        ]
        return db.batchWrite(params).promise();
    })


    step("insert attends", () => {
        var params = { RequestItems: {} };
        params.RequestItems[Tables.attend] = [
            {
                PutRequest: {
                    Item: {
                        id: 1,
                        eventId: eventId,
                        userId: 1,
                        status: "yes",
                        lateTime: 0,
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        id: 2,
                        eventId: eventId,
                        userId: 2,
                        status: "no",
                        lateTime: 0,
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        id: 3,
                        eventId: eventId,
                        userId: 3,
                        status: "pending",
                        lateTime: 0,
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        id: 4,
                        eventId: eventId,
                        userId: 4,
                        status: "late",
                        lateTime: 30,
                    }
                }
            }
        ]
        return db.batchWrite(params).promise();
    })

    step("archive event", () => {
        let e = new EventArchiver();
        return e.archive(eventId)
    })

    step("verify event is updated", (done) => {
        let params = {
            "TableName": Tables.event,
            "KeyConditionExpression": "id = :id",
            "ExpressionAttributeValues": {
                ":id": eventId,
            },
            "Limit": "1",
        }
        db.query(params).promise().then(data => {
            if (data.Count) {
                let e = data.Items[0];
                expect(e.historyStatus).to.equal("true");
                expect(e.status).to.equal("archive");
                done();
            } else {
                done("couldnt find event")
            }
        }).catch(err => {
            done("couldnt find event")
        });
    })

    step("verify users have been updated", (done) => {
        let params = {
            "TableName": Tables.user,
            "IndexName": "guild",
            "KeyConditionExpression": "guildId = :guildId",
            "ExpressionAttributeValues": {
                ":guildId": guildId,
            },
            "Limit": "10",
        }
        return db.query(params).promise().then(data => {
            let user1 = data.Items.find(u => u.id == 1);
            expect(user1.attendance.yes).to.equal(2)
            expect(user1.attendance.no).to.equal(0)
            expect(user1.attendance.late).to.equal(0)
            expect(user1.attendance.pending).to.equal(0);
            expect(user1.attendance.lateTime).to.equal(0);

            let user = data.Items.find(u => u.id == 2);
            expect(user.attendance.yes).to.equal(0)
            expect(user.attendance.no).to.equal(2)
            expect(user.attendance.late).to.equal(0)
            expect(user.attendance.pending).to.equal(0);
            expect(user.attendance.lateTime).to.equal(0);

            user = data.Items.find(u => u.id == 3);
            expect(user.attendance.yes).to.equal(0)
            expect(user.attendance.no).to.equal(1)
            expect(user.attendance.late).to.equal(0)
            expect(user.attendance.pending).to.equal(3);
            expect(user.attendance.lateTime).to.equal(0);

            user = data.Items.find(u => u.id == 4);
            expect(user.attendance.yes).to.equal(0)
            expect(user.attendance.no).to.equal(0)
            expect(user.attendance.late).to.equal(2)
            expect(user.attendance.pending).to.equal(0);
            expect(user.attendance.lateTime).to.equal(60);

            done();
        }).catch(err => {
            done(err);
        })
    })

    step("error on EventArchiver.archive", (done) => {
        let e = new EventArchiver();
        e.archive("dsadsa").then(data => done("should throw error")).catch(err => { done() });
    });

    step("error on EventArchiver.updateUsers", (done) => {
        let e = new EventArchiver();
        e.updateUsers("dsadsa", ).then(data => done("should throw error")).catch(err => { done() });
    });

    step("error on EventArchiver.saveUpdates", (done) => {
        let e = new EventArchiver();
        e.saveUpdates("dsadsa").then(data => done("should throw error")).catch(err => { done() });
    });

    step("resolve when no updates EventArchiver.saveUpdates", (done) => {
        let e = new EventArchiver();
        e.saveUpdates([]).then(data => done()).catch(err => { done("shouldn't throw error") });
    });

    step("error on EventArchiver.saveUpdates on db query", (done) => {
        let e = new EventArchiver();
        e.saveUpdates([{ user: { id: "Dsadsadsa" }, attend: { status: "no" } }]).then(data => done("should throw error")).catch(err => { done() });
    });

    step("error on EventArchiver.updateEvent", (done) => {
        let e = new EventArchiver();
        e.updateEvent("dsadsa").then(data => done("should throw error")).catch(err => { done() });
    });
});