import Guild from './Guild/Guild';
import modifyResponse from './../../../modifyResponse';


module.exports.f = modifyResponse((event, context, callback) => {

    let err = (err) => {
        callback("error fetching data");
    }

    let success = (data) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({attendance:data}),
        }
        callback(null, response);
    }

    let authorizer = JSON.parse(event.requestContext.authorizer.json);
    let guildId = authorizer.guildId;
    let isManager = authorizer.isManager;
    let userId = authorizer.userId;

    let g = new Guild();
    g.attendance(guildId, isManager, userId).then(success).catch(err);

});
