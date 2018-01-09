import Attend from './Attend/Attend';
import modifyResponse from './../../modifyResponse';


module.exports.f = modifyResponse((event, context, callback) => {

    let error = (err) => {
        const response = {
            statusCode: 404,
            body: JSON.stringify({ codeExists: false }),
        }
        callback(null, response);
    }

    let success = (data) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        }
        callback(null, response);
    }

    let a = new Attend();
    a.dataFromToken(event.pathParameters.token).then(success).catch(error)


});
