import Guild from './Guild/Guild';
import modifyResponse from './../../../modifyResponse';


module.exports.f = modifyResponse((event, context, callback) => {

    let err = (err) => {
        callback("error fetching data");
    }

    let success = (data) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        }
        callback(null, response);
    }

    let authorizer = JSON.parse(event.requestContext.authorizer.json);

    let guildId = authorizer.guildId;

    let g = new Guild();
    g.inviteCode(guildId).then(success).catch(err);

});
