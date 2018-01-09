import modifyResponse from './../../../modifyResponse';


module.exports.f = modifyResponse((event, context, callback) => {

    let authorizer = JSON.parse(event.requestContext.authorizer.json);


    const response = {
        statusCode: 200,
        body: JSON.stringify({
            guild: authorizer.guild,
            guildId: authorizer.guildId,
            isManager: authorizer.isManager,
            charName: authorizer.charName,
            userId: authorizer.userId,
        }),
    }
    callback(null, response);

});
