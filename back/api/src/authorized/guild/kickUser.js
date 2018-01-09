import User from './../user/User/User';
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

    let authorizer = JSON.parse(event.requestContext.authorizer.json);
    let userId = event.pathParameters.userId;
    let guildId = authorizer.guildId;

    let u = new User();
    u.deleteUser(userId,guildId).then(success).catch(err);

});
