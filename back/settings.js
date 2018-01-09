
let credentials = require('./../awsCredentials');

let shortID = require('shortid');
shortID.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
shortID.seed(44884932);
let AWS = require('aws-sdk');
AWS.config.update(credentials);




let siteUrl = "http://impbots.com";

let s = {
    siteUrl: siteUrl,
    endpointReset: () => {
        s.dbDoc = new AWS.DynamoDB.DocumentClient();
        s.db = new AWS.DynamoDB();
        s.SNS = new AWS.SNS(Object.assign({}, credentials, { region: 'eu-west-1' }));
    },
    AWS: AWS,
    shortID: shortID,
    tableName: require('./tables'),
}

s.endpointReset();

module.exports = s;

