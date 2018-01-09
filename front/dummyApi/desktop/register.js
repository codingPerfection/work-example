
module.exports = {
    //component login
    '/needMobileToken/': {
        put: [
            {
                input: {
                    guildToken: 'aaa',
                    phone: '+385989411056',
                    charName: 'Siljko'
                },
                output: {
                    ok: true,
                }
            },
            {
                input: {
                    guildToken: 'aaa',
                    phone: '+111',
                    charName: 'Siljko'
                },
                output: {
                    invalidPhone: true
                }
            },
        ]
    },
    //first that registers for guild is manager
    '/confirmMobileToken/': {
        put: [
            {
                input: {
                    guildToken: 'aaa',
                    phone: '+385989411056',
                    charName: 'Siljko',
                    phoneToken: '123456',
                },
                output: {
                    loginToken: '123456',
                }
            },
            {
                input: {
                    guildToken: 'aaa',
                    phone: '+385989411056',
                    charName: 'Siljko',
                    phoneToken: '111'
                },
                output: {
                    invalidPhoneToken: true
                }
            }
        ]
    }
};