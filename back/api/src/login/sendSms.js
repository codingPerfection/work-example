import Login from './Login/Login';
import modifyResponse from './../../modifyResponse';

module.exports.f = modifyResponse((event, context, callback) => {

    let ip = event.requestContext.identity.sourceIp;
    let body = JSON.parse(event.body);

    let error = (err) => {
        let res = { invalidPhoneUser: true };
        /* istanbul ignore next */
        if (err && err.limitReached) {
            res = { limitReached: true };
        }
        const response = {
            statusCode: 404,
            body: JSON.stringify(res),
        }
        callback(null, response);
    }


    if (body.phone) {
        let login = new Login();
        /* istanbul ignore next */
        login.sendSMS(body.phone, ip).then((data) => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(data),
            }
            callback(null, response);
        }).catch(error);
    } else {
        error();
    }

});
