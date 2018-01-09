import User from './User/User';
import modifyResponse from './../../../modifyResponse';


module.exports.f = modifyResponse((event, context, callback) => {

    let err = (err) => {
        callback("error fetching data");
    }

    let success = (data) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({ ok: true }),
        }
        callback(null, response);
    }

    let body = JSON.parse(event.body);
    let authorizer = JSON.parse(event.requestContext.authorizer.json);


    let userId = parseInt(event.pathParameters.userId);
    let guildId = authorizer.guildId;
    let charType = body.charType;


    let u = new User();
    u.roleChange(userId, guildId, charType).then(success).catch(err);

});
