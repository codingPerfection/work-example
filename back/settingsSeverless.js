
let siteUrl = "http://impbots.com/";
let stage = 'v02';

let s = {
    siteUrl: siteUrl,
    registerUrl: siteUrl + "register/",
    attendUrl: siteUrl + "a/",
    version: 'attendBot-' + stage + '-',
    cors: true,
    smsSettings: {
        //ttl in seconds
        smsSend: {
            ttl: 600,
            maxActive: 3
        },
        smsConsume: {
            ttl: 600,
            maxActive: 10
        }
    }
}

s.smsTemplates = {
    register: "Hi :::charName:::. Your impbots registration token is :::token:::",
    login: "Hi :::charName:::. Your impbots login token is :::token:::",
    attend: "Hi :::charName:::. Are you coming to raid? confirm here: " + s.attendUrl + ":::attendCode:::"
}

s.apiVersion =
    /* istanbul ignore next */
    () => {
        return stage;
    };

s.apiCORS =
    /* istanbul ignore next */
    () => {
        return s.cors;
    }

s.cronVersion =
    /* istanbul ignore next */
    () => {
        return stage;
    }

s.getVersion =
    /* istanbul ignore next */
    () => {
        return s.version;
    }




module.exports = s;