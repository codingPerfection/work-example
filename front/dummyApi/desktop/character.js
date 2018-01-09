
module.exports = {
    //component login
    '/check/:charName/:guildCode': {
        get: [
            {
                input: {
                    charName: 'siljko',
                    guildCode: 'aaa'
                },
                output: {
                    exists: true,
                    charName: 'Siljko'
                }
            },
            {
                input: {
                    charName: 'ral',
                    guildCode: 'aaa'
                },
                output: {
                    exists: false,
                }
            }
        ]
    },
};