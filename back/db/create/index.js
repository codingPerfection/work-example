// require('./create')().then(() => {
//     console.log("all tables created");
//     console.log("wait for tables to be created, then uncomment code to update ttl and  insert id's")
// }).catch(err => { console.log("failed at creating table"); console.log(err); });


//update ttls
require('./updateTtl')().then((data) => { console.log("ttl updated") }).catch(err => {
    console.log("failed to update ttl");
    console.log(err);
})

//insert startId
require('./insertStartIds')().then((data) => { console.log("start ids inserted") }).catch(err => {
    console.log("failed to insert start ids");
    console.log(err);
})
