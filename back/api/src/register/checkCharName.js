import Register from './Register/Register';
import modifyResponse from './../../modifyResponse';

module.exports.f = modifyResponse((event, context, callback) => {

    if (event.pathParameters.token && event.pathParameters.charName) {
        let register = new Register();
        register.getChar(event.pathParameters.charName, event.pathParameters.token).then((data) => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(data),
            }
            callback(null, response);
        }).catch((err) => {
            const response = {
                statusCode: 404,
                body: JSON.stringify({ exists: false }),
            }
            callback(null, response);
        })
    } else {
        const response = {
            statusCode: 404,
            body: JSON.stringify({ exists: false }),
        }
        callback(null, response);
    }
});
