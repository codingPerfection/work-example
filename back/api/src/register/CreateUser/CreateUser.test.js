import "mocha-steps";
import { expect } from 'chai';
import Tables from './../../../../tables';
import TestSettings from './../testSettings';
import moment from 'moment';

import CreateUser from './CreateUser';

describe("should test register/CreateUser/createUser ", function () {

    this.timeout(5000);

    let guildId = 3;
    let guild2Id = 4;
    let phone = "+001";
    let phone2 = "+002"
    let user;

    step("insert guild", () => {
        let params = {
            TableName: Tables.guild,
            Item: {
                id: guildId,
                name: "test",
                managerId: null,
            }
        }
        return db.put(params).promise();
    })

    let deleteUsers = (guildId) => {
        step("delete all users for guild:"+guildId, (done) => {
            let params = {
                TableName: Tables.user,
                "IndexName": "guild",
                "KeyConditionExpression": "guildId = :id",
                "ExpressionAttributeValues": {
                    ":id": guildId
                },
                Limit: 25
            };
            db.query(params).promise().then((data) => {
                if (parseInt(data.Count)) {
                    let forDelete = data.Items.map((u) => {
                        return {
                            DeleteRequest: {
                                Key: { id: u.id }
                            }
                        }
                    });
                    let params = { RequestItems: {} };
                    params.RequestItems[Tables.user] = forDelete;
                    db.batchWrite(params).promise().then((data) => {
                        done();
                    }).catch(done)
                } else {
                    done();
                }
            }).catch(done);
        })
    }

    deleteUsers(guildId);
    deleteUsers(guild2Id);

    step("save user which is manager", function (done) {
        let c = new CreateUser()
        c.saveChar(guildId, phone, "test", "test", "test").then((data) => {
            user = data;
            done()
        }).catch(err => {
            console.log(err);
            done("smth went wrong");
        })
    });

    let checkForManager = () => {
        step("check that 1. user is manager", (done) => {
            var queryParams = {
                "TableName": Tables.guild,
                "KeyConditionExpression": "id = :id",
                "ExpressionAttributeValues": {
                    ":id": guildId
                },
                "Limit": "2",
                "ScanIndexForward": false,
                "ConsistentRead": true,
            }
            db.query(queryParams).promise().then((data) => {
                expect(data.Items[0].managerId).to.equal(user.id);
                done();
            }).catch(done);
        });
    }

    checkForManager();

    let user2;
    step("save 2. user which is not manager", function (done) {
        let c = new CreateUser()
        c.saveChar(guildId, phone2, "test", "test", "test").then((data) => {
            user2 = data;
            done()
        }).catch(err => {
            console.log(err);
            done("smth went wrong");
        })
    });

    checkForManager();


    step("insert 2. guild", () => {
        let params = {
            TableName: Tables.guild,
            Item: {
                id: guild2Id,
                name: "test",
                managerId: null,
            }
        }
        return db.put(params).promise();
    })

    let user3;
    step("resave 2. user which is now manager for 2. guild (3. user)", function (done) {
        let c = new CreateUser()
        c.saveChar(guild2Id, phone2, "test", "test", "test").then((data) => {
            user3 = data;
            done()
        }).catch(err => {
            console.log(err);
        })
    });

    step("check that 2. user is  deleted", (done) => {
        var queryParams = {
            "TableName": Tables.user,
            "KeyConditionExpression": "id = :id",
            "ExpressionAttributeValues": {
                ":id": user2.id
            },
            "Limit": "2",
            "ScanIndexForward": false,
            "ConsistentRead": true,
        }
        db.query(queryParams).promise().then((data) => {
            expect(data.Items.length).to.equal(0);
            done();
        }).catch(done);
    });

    step("check that 3. user is manager", (done) => {
        var queryParams = {
            "TableName": Tables.guild,
            "KeyConditionExpression": "id = :id",
            "ExpressionAttributeValues": {
                ":id": guild2Id
            },
            "Limit": "2",
            "ScanIndexForward": false,
            "ConsistentRead": true,
        }
        db.query(queryParams).promise().then((data) => {
            expect(data.Items[0].managerId).to.equal(user3.id);
            done();
        }).catch(done);
    });

    deleteUsers(guildId);
    deleteUsers(guild2Id);


});