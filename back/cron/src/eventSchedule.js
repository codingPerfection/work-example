import EventCron from './events/EventCron/EventCron';


module.exports.f = (event, context, callback) => {

    let e = new EventCron(event.time);

    e.check().then((data)=>{
        callback(null, {success: true});
    }).catch(err=>{
        console.log(err);
        callback("error at cron");
    })

};
