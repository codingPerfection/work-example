import EventArchiver from './EventArchiver/EventArchiver';

module.exports.f = (event, context, callback) => {

    let data = JSON.parse(event.Records[0].Sns.Message);

    let onFail = (err) => {
        console.log(err);
        callback("archive event failed");
    }

    if (data.eventId) {
        let e = new EventArchiver();
        e.archive(data.eventId).then((data) => {
            callback(null, { ok: true });
        }).catch(onFail);
    } else {
        onFail("no eventID")
    }

};