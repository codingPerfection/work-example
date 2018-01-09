import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../tables';


import authorizer from './authorizer';

describe("should test authorizer ", function () {

    this.timeout(5000);

    let userId = 1;
    let token = "111";

    step("user pass authorizer", function (done) {
        let event = {
            type: 'TOKEN',
            methodArn: 'arn:aws:execute-api:eu-central-1:342292996338:75nweb7pw6/dev/GET/user',
            authorizationToken: "v1 1001---oQbUECvvVAUiPfbY7Yu9E30lPMfbStkKcQQuMZCDAVMRsZd0Oy6JoEm9E7jNuK2L"
        }
        let context = null;
        let callback = (err, data) => {
            console.log(data);
            console.log(data.context);
            done();
        }
        authorizer.f(event, context, callback);
    })

});