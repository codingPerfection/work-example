import blizzCreds from './../../../../../blizzardCredentials';
import request from 'request';

let toHumanClass = (num) => {
    /* istanbul ignore next */
    switch (num) {
        case 1:
            return 'warrior';
        case 2:
            return 'paladin';
        case 3:
            return 'hunter';
        case 4:
            return 'rogue';
        case 5:
            return 'priest';
        case 6:
            return 'deathKnight';
        case 7:
            return 'shaman';
        case 8:
            return 'mage';
        case 9:
            return 'warlock';
        case 10:
            return 'monk';
        case 11:
            return 'druid';
        case 12:
            return 'demonHunter';
    }

}


export default (charName, server) => {
    return new Promise((res, rej) => {
        let serverDetails = server.split("/");
        if (serverDetails.length !== 2) {
            rej("wrong server format");
        } else {
            let url = "https://" + serverDetails[0] + ".api.battle.net/wow/character/" + serverDetails[1]
                + "/" + charName + "?fields=talents&locale=en_GB&apikey=" + blizzCreds.Key;
            request(url, function (error, response, body) {
                if (!error && response && response.statusCode === 200) {
                    let data = JSON.parse(body);
                    let charName = data.name;
                    let charClass = toHumanClass(data.class);
                    let selectedTalents = data.talents.filter(t => t.selected);
                    let selectedRole = selectedTalents.find(t => t.spec && t.spec.role).spec.role.toLowerCase();
                    res({ charName: charName, charClass: charClass, charType: selectedRole });
                } else {
                    rej("doesn't exists");
                }
            });
        }
    })

}