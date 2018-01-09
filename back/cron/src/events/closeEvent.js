import eventUpdater from './../helpers/EventUpdater';
import AWS from 'aws-sdk';

module.exports.f = (event, context, callback) => {

    let data = JSON.parse(event.Records[0].Sns.Message);

    let onFail = (err) => {
        console.log(err);
        callback("close event failed");
    }

    if (data.eventId) {
        let db = new AWS.DynamoDB.DocumentClient();
        eventUpdater(db, data.eventId, 'closed').then((data) => {
            callback(null, { ok: true });
        }).catch(onFail);
    } else {
        onFail("no eventId")
    }

};