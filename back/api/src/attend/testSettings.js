import moment from 'moment';
import Tables from './../../../tables';


module.exports = (step, attendCode, attendId, eventId) => {
    step("insert test guild and user", function () {
        return login(1, 1, "123", false);
    });

    step("insert attendCode", () => {
        let params = {
            TableName: Tables.attendCode,
            Item: {
                code: attendCode,
                attendId: attendId,
                ttl: moment.utc().add(600, 'seconds').unix()
            }
        };
        return db.put(params).promise();
    });

    step("insert test attend", () => {
        let params = {
            TableName: Tables.attend,
            Item: {
                id: attendId,
                eventId: eventId,
                userId: 1,
                status: "pending",
                statusChanged: 0,
                lateTime: 0,
            }
        };
        return db.put(params).promise();
    })

    step("insert test event", () => {
        let params = {
            TableName: Tables.event,
            Item: {
                id: eventId,
                guildId: 1,
                open: 1,
                close: 1,
                name: "event",
            }
        };
        return db.put(params).promise();
    });
}