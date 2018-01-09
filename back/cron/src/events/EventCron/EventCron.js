import AWS from 'aws-sdk';
import TableName from './../../../../tables';
import SNSTopics from './../../../../sns';
import TimeSchedule from './../../helpers/TimeSchedule';




class EventCron {

    constructor(currentTime) {
        this.db = new AWS.DynamoDB.DocumentClient();
        this.sns = new AWS.SNS();
        this.batchLimit = 50;

        let interval = 30; //interval in minutes
        let t = new TimeSchedule(currentTime, interval);

        this.startTime = t.start();
        this.endTime = t.end();
    }

    publishSns(actions) {
        return new Promise((res, rej) => {
            let counter = 0;

            if (actions.length == 0) {
                res();
            }

            actions.map((a) => {
                let params = {
                    TopicArn: (SNSTopics.event())[a.topic],
                    Message: JSON.stringify(a)
                }
                this.sns.publish(params).promise().then(data => {
                    counter++;
                    if (counter === actions.length) {
                        res({ ok: true });
                    }
                }).catch(rej);
            })
        })
    }

    fetchBatch(timeStart, timeEnd, lastEvaluatedKey) {
        return new Promise((res, rej) => {
            let params = {
                TableName: TableName.eventCron,
                IndexName: "cron",
                KeyConditionExpression: "#partition = :partition AND #time BETWEEN :timeStart AND :timeEnd",
                ExpressionAttributeValues: {
                    ":timeStart": timeStart,
                    ":timeEnd": timeEnd,
                    ":partition": 1,
                },
                ExpressionAttributeNames: {
                    "#time": "time",
                    "#partition": "partition"
                },
                Limit: this.batchLimit,
            }

            if (lastEvaluatedKey) {
                params.ExclusiveStartKey = lastEvaluatedKey;
            }


            this.db.query(params).promise().then((data) => {
                this.publishSns(data.Items)
                    .then(d => res(data.LastEvaluatedKey))
                    .catch(rej);
            }).catch(rej);
        })
    }

    check() {
        return new Promise((res, rej) => {

            let onSuccess = (key) => {
                if (key == null) {
                    res({ ok: true });
                } else {
                    this.fetchBatch(this.startTime, this.endTime, key).then(onSuccess).catch(rej);
                }
            }

            this.fetchBatch(this.startTime, this.endTime, false).then(onSuccess).catch(rej);
        })
    }
}

export default EventCron;