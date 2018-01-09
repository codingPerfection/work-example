import EventCreator from './EventCreator/EventCreator';

module.exports.f = (event, context, callback) => {

    let data = JSON.parse(event.Records[0].Sns.Message);

    let onFail = (err) => {
        console.log(err);
        callback("create event failed");
    }

    if (data.eventClassId) {
        let e = new EventCreator();
        e.fromClass(data.eventClassId).then((data) => {
            callback(null, { ok: true });
        }).catch(onFail);
    } else {
        onFail("no eventClassId")
    }

};