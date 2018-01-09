import { request } from './Request'
import { extendObservable } from 'mobx';

class UserSettings {

    constructor() {
        this.fetched = false;
        extendObservable(this, {
            isManager: null,
            guild: null,
            fetched: null,
            charId: null,
        })
    }



    getUserSettings() {
        return request.sendGet('user/', true).then((data) => {
            this.isManager = data.isManager;
            this.guild = data.guild;
            this.fetched = true;
            this.charId = data.userId;
            return data;
        });
    }

}




export let userSettings = new UserSettings();