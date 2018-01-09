module.exports =
    /* istanbul ignore next */
    (f) => {
        return (event, context, callback) => {
            let customHeaders = {
                'Access-Control-Allow-Origin': '*'
            }
            let parsingFunction = (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    let d = data;
                    d.headers = Object.assign(customHeaders, data.headers);
                    callback(null, d);
                }
            }
            f(event, context, parsingFunction);
        }
    }