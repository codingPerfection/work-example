
module.exports = {
    //component login
    '/needMobileToken': {
        put: [
            {
                input: {
                    phone: '+111'
                },
                output: {
                    ok: true,
                    invalidPhoneUser: true
                }
            },
            {
                input: {
                    phone: '+385989411056'
                },
                output: {
                    ok: true,
                }
            }
        ]
    },
    '/confirmMobileToken/': {
        put: [
            {
                input: {
                    phone: '+385989411056',
                    phoneToken: '123456'
                },
                output: {
                    ok: true,
                    loginToken: '123456'
                }
            },
            {
                input: {
                    phone: '+385989411056',
                    phoneToken: '111'
                },
                output: {
                    invalidPhoneToken: true
                }
            }
        ]
    }
};