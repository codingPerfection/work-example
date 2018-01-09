import Register from './Register/Register';
import modifyResponse from './../../modifyResponse';



module.exports.f = modifyResponse((event, context, callback) => {

    let error = (err) => {
        const response = {
            statusCode: 404,
            body: JSON.stringify({ exists: false }),
        }
        callback(null, response);
    }

    if (event.pathParameters.token) {
        let register = new Register();
        register.getGuildByToken(event.pathParameters.token).then((data) => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(data),
            }
            callback(null, response);
        }).catch(error)
    } else {
        error();
    }




});
