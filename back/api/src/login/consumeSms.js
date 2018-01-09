import Login from './Login/Login';
import modifyResponse from './../../modifyResponse';

/* istanbul ignore next */
module.exports.f = modifyResponse((event, context, callback) => {

    let ip = event.requestContext.identity.sourceIp;
    let body = JSON.parse(event.body);

    let error = (err) => {
        let res = { invalidPhoneToken: true };
        if (err && err.limitReached) {
            res = { limitReached: true };
        }
        const response = {
            statusCode: 404,
            body: JSON.stringify(res),
        }
        callback(null, response);
    }


    if (body.phone && body.phoneToken) {
        let login = new Login();
        login.consumeSms(body.phoneToken, body.phone, ip).then((data) => {
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
