# This is a work example
This project is used in few gaming communities.

I tried to use best practice while being agile.

Some of the technology used is:  dynamo db, serverless (Api gateway + lambda), express, nodejs, react with mobx, and standard (html,css,js).
[Cron part](./back/cron) is a cool scalable back-end feature i am really proud of. 

Code coverage is at 100% on [desktop react app](./front/desktop/), [api](./back/api) and [cron](./back/cron/)

This repo is mainly used to show off my work (in order to get payed job). If you want to use some or all code from this repo feel free to do so. Up to date version is on the private repo.

## running tests
Code coverage used: (nyc) istanbul

Testing tools used: mocha, enzyme, mocha-step, chai

To run tests you need to create 2 files in project root:
 -  awsCredentials.js
 -  blizzardCredentials.js

### awsCredentials.js
Role must have permission for full dynamoDb access, and full sns Access, if you are deploying to serverless, full access to cloudWatch would be nice so you get logs.
 ```
 module.exports = {
    accessKeyId: 'yourAccessKey',
    secretAccessKey: 'yourSecretKey',
    region: 'eu-central-1',
    apiVersion: '2012-08-10',
}
 ``` 

 ### blizzardCredentials.js
  ```
 module.exports = {
    Key: 'yourKey',
    Secret: 'yourSecret'
}
 ```

### to run tests for back
 - create dynamoDb tables (scripts are in ./back/db/create )
 - create sns topics on aws and update sns.js with arns(./back/sns)
 - npm run test (from ./back/package.json)

### to run tests for front
 - lift a dummy server
    - node ./front/dummyApi/index.js
 - npm run test (from ./front/desktop/)