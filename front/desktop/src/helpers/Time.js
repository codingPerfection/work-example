import moment from 'moment';

class Time {
    //calculates in portion
    getIn(dateTimeTimezoned) {
        var openM = moment(dateTimeTimezoned);
        var nowM = moment();

        //calculate in
        var minutesDiff = openM.diff(nowM);
        /* istanbul ignore next */
        if (minutesDiff < 0) {
            return 'in progress';
        } else {
            return openM.from(nowM);
        }
    }
    //gets timezoned time
    getTime(timeTimezoned) {
        var openM = moment(timeTimezoned);
        return openM.format('H') + ":" + openM.format('mm');
    }
    //gets wed 24 timezoned
    getDay(timeTimezoned) {
        var openM = moment(timeTimezoned);
        return openM.format('ddd') + " " + openM.format('D');
    }
    getdayOfWeek(timeTimezoned){
        var openM = moment(timeTimezoned);
        return openM.format('ddd');
    }
    getLateTime(m) {
        var mins = parseInt(m, 0);
        var inHours = Math.floor(mins / 60);
        var inMinutes = mins % 60;
        if (inHours !== 0) {
            /* istanbul ignore next */
            if (inMinutes !== 0) {
                return inHours + ' h ' + inMinutes + 'min';
            } else {
                return inHours + ' h';
            }

        } else {
            return inMinutes + ' min';
        }
    }
}

export let time = new Time();