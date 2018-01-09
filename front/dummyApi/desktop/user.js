
module.exports = {
    //component login
    '/roleChange/:id': {
        post: [
            {
                input: {
                    authorization: '123456',
                    id: '1111',
                    charType: 'tank'
                },
                output: {
                    ok: true
                }
            }
        ]
    },
    '/': {
        get: [
            {
                input: {
                    authorization: '123456',
                },
                output: {
                    guild: 'Renascentia',
                    charName: 'Siljko',
                    userId: '1',
                    isManager: true,
                }
            }
        ],
        delete: [
            {
                input: {
                    authorization: '1234567',
                },
                output: {
                    ok: true,
                }
            }
        ]
    },
};