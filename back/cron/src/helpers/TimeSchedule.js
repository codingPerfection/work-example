import moment from 'moment';


class TimeSchedule {

    // schedule in minutes
    constructor(currentTime, schedule) {
        let startTime = moment(currentTime).seconds(0).utc();
        let endTime = startTime.clone().add(schedule, 'm').subtract(1, 'seconds');
        //start time with 0 second (example 18:00:00);
        this.startTime = startTime.unix();
        //end time with 59 seconds (example 18:29:59);
        this.endTime = endTime.unix();
    }

    start() {
        return this.startTime;
    }

    end() {
        return this.endTime;
    }


}

export default TimeSchedule;