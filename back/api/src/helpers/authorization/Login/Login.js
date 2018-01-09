import TableName from './../../../../../tables';
import AWS from 'aws-sdk';
import moment from 'moment';
import randomize from 'randomatic';


class Login {

    constructor() {
        this.dbDoc = new AWS.DynamoDB.DocumentClient();
    }

    loginUser(userId) {
        return new Promise((res, rej) => {
            let pass = randomize('Aa0', 64);
            let loginToken = userId + '---' + pass;
            let created = moment.utc().unix();
            this.dbDoc.put({
                TableName: TableName.loginToken,
                Item: {
                    token: loginToken,
                    created: created,
                }
            }).promise().then(data => {
                res({ loginToken: loginToken })
            }).catch(rej);
        })
    }

    isTokenValid(authorization) {
        return new Promise((res, rej) => {
            let token = authorization.split(" ")[1];
            let loginToken = token.split("---");
            let userId = loginToken[0];
            var queryParams = {
                "TableName": TableName.loginToken,
                "ExpressionAttributeNames": {
                    "#token": "token",
                },
                "KeyConditionExpression": "#token = :token",
                "ExpressionAttributeValues": {
                    ":token": token
                },
                "Limit": "1",
            }
            this.dbDoc.query(queryParams).promise().then((data) => {
                if (data.Count == 1) {
                    res({ userId: parseInt(userId) });
                } else {
                    rej();
                }
            }).catch(rej);
        })
    }

}

export default Login;