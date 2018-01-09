import Event from './Events/Events';
import modifyResponse from './../../../modifyResponse';

module.exports.f = modifyResponse((event, context, callback) => {

    let err = (err) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({ events: [] }),
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

    let authorizer = JSON.parse(event.requestContext.authorizer.json);
    let guildId = authorizer.guildId;

    let e = new Event();
    e.eventsForGuild(guildId).then(success).catch(err);

});
