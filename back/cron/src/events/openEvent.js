import EventOpener from './EventOpener/EventOpener';

module.exports.f = (event, context, callback) => {

    let data = JSON.parse(event.Records[0].Sns.Message);

    let onFail = (err) => {
        console.log(err);
        callback("open event failed");
    }

    if (data.eventId) {
        let e = new EventOpener();
        e.openEvent(data.eventId).then((data) => {
            callback(null, { ok: true });
        }).catch(onFail);
    } else {
        onFail("no eventID")
    }

};