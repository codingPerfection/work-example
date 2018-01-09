import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../tables';


import authorizer from './authorizer';

describe("should test authorizer ", function () {

    this.timeout(5000);

    let userId = 1;
    let token = "111";

    step("insert test data manager", function () {
        let p = login(1, userId, token, true);
        return p;
    });

    step("manager pass authorizer", function (done) {
        let event = {
            type: 'TOKEN',
            methodArn: 'arn:aws:execute-api:eu-central-1:342292996338:75nweb7pw6/dev/GET/user',
            authorizationToken: 'v1 ' + userId + "---" + token
        }
        let context = null;
        let callback = (err, data) => {
            if (data.policyDocument.Statement[0].Effect === "Deny") {
                done("smth went wrong");
            } else {
                done(err);
            }
        }
        authorizer.f(event, context, callback);
    })

    step("insert test data user", function () {
        let p = login(1, userId, token, false);
        return p;
    });

    step("user pass authorizer", function (done) {
        let event = {
            type: 'TOKEN',
            methodArn: 'arn:aws:execute-api:eu-central-1:342292996338:75nweb7pw6/dev/GET/user',
            authorizationToken: 'v1 ' + userId + "---" + token
        }
        let context = null;
        let callback = (err, data) => {
            if (data.policyDocument.Statement[0].Effect === "Deny") {
                done("smth went wrong");
            } else {
                done(err);
            }
        }
        authorizer.f(event, context, callback);
    })

    step("wrong token deny access", function (done) {
        let event = {
            type: 'TOKEN',
            methodArn: 'arn:aws:execute-api:eu-central-1:342292996338:75nweb7pw6/dev/GET/user',
            authorizationToken: 'v1 ' + userId + "---" + "123dadas12"
        }
        let context = null;
        let callback = (err, data) => {
            if (data.policyDocument.Statement[0].Effect === "Deny") {
                done();
            } else {
                done("smth went wrong");
            }
        }
        authorizer.f(event, context, callback);
    })

    step("delete user data", function () {
        let params = {
            TableName : Tables.user,
            Key: {
              id: userId,
            }
        }
        return db.delete(params).promise();;
    })

    step("authorizer return error", function (done) {
        let event = {
            type: 'TOKEN',
            methodArn: 'arn:aws:execute-api:eu-central-1:342292996338:75nweb7pw6/dev/GET/user',
            authorizationToken: 'basic ' + userId + "---" + token
        }
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done();
            }else{
                done("smth went wrong");
            }
        }
        authorizer.f(event, context, callback);
    })

});