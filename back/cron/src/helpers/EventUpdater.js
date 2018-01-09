import moment from 'moment';
import TableName from './../../../tables';



let update = (db, eventId, status, historyStatus) => {
    return new Promise((res, rej) => {
        let params = {
            Key: { id: eventId },
            TableName: TableName.event,
            UpdateExpression: 'set  #status = :status',
            ExpressionAttributeNames: {
                "#status": "status"
            },
            ExpressionAttributeValues: {
                ':status': status,
            },
            ReturnValues: "ALL_NEW"
        }

        if (typeof historyStatus !== "undefined") {
            params.UpdateExpression += ", #historyStatus = :historyStatus";
            params.ExpressionAttributeValues[":historyStatus"] = historyStatus;
            params.ExpressionAttributeNames["#historyStatus"] = "historyStatus";
        }

        db.update(params).promise().then(data => {
            res(data.Attributes);
        }).catch(rej);
    })
}

export default update;