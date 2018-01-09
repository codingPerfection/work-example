class Settings {
    constructor() {
        this.apiLocation = 'https://api.impbots.com/v02/'
        // this.apiLocation = "http://localhost:3006/";
    }
    trackRequests = false;
    delayRequests = false;
    charTypes = ["dps", "healer", "tank"];

    setupTestingEnvironment() {
        this.trackRequests = true;
        this.delayRequests = true;
    }
}


export let settings = new Settings();