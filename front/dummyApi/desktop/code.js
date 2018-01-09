
module.exports = {
    //component login
    '/guild/:id': {
        get: [
            {
                input: {
                    id: 'aaa'
                },
                output: {
                    guild: 'Renascentia',
                }
            },
            {
                input: {
                    id: '111'
                },
                output: {
                    exists: false,
                }
            }
        ]
    },
};