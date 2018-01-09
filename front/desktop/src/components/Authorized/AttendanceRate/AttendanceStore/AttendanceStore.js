import { extendObservable } from 'mobx';
import { request } from './../../../../helpers/Request';
import { time } from './../../../../helpers/Time';
import { settings } from './../../../../Settings';

class AttendanceStore {

    constructor() {

        extendObservable(this, {
            all: null,
            dps: null,
            healer: null,
            tank: null,
            kickModal: null,
            changeRoleModal: null,
        });
    }

    fetchAttends() {
        return request.sendGet('guild/attendance/', true).then((data) => {
            this.all = data.attendance;
            this.filterTypes(data.attendance);
            return data;
        })
    }

    filterTypes(data) {
        settings.charTypes.forEach((type) => {
            //filter out the needed
            let attends = data.filter(char => char.charType === type);
            //calculate rates and totals
            attends.forEach(char => {
                char.attendanceRateFull = this.calculateAttendanceRate(char);
                char.attendanceRate = char.attendanceRateFull.text;
                char.lateRateFull = this.calculateLateRate(char);
                char.lateRate = char.lateRateFull.text;
                char.avgLateTimeFull = this.calculateAverageLateTime(char);
                char.avgLateTime = char.avgLateTimeFull.text;
            });
            let obj = this.findAverages(attends, type);
            obj.users = attends;
            obj.type = type;
            this[type] = obj;
        })
    }

    kickGuildie(char) {
        return request.sendDelete('guild/kick/' + char.id, true).then(() => {
            let i = this.all.findIndex(e => char.id === e.id);
            this.all.splice(i, 1);
            this.filterTypes(this.all);
        })
    }


    changeRole(char, charType) {
        return request.sendPost('user/roleChange/' + char.id, { charType: charType }, true).then(() => {
            let c = this.all.find(e => char.id === e.id);
            c.charType = charType;
            this.filterTypes(this.all);
        })
    }

    findAverages(users, type) {
        let o = { lateRate: 0, attendanceRate: 0, avgLateTime: 0 };
        let usersForAverage = users.filter(u => u.attendanceRateFull.ignore === false);
        usersForAverage.map((u, index) => {
            o.attendanceRate += (u.attendanceRateFull.percent - o.attendanceRate) / (index + 1);
            o.lateRate += (u.lateRateFull.percent - o.lateRate) / (index + 1);
            o.avgLateTime += (u.avgLateTimeFull.time - o.avgLateTime) / (index + 1);
        })
        o.attendanceRate = Math.round(o.attendanceRate) + "%";
        o.lateRate = Math.round(o.lateRate) + "%";
        o.avgLateTime = time.getLateTime(Math.round(o.avgLateTime));
        return o;
    }

    //late/(yes+late)
    calculateLateRate(c) {
        var total = (parseInt(c.yes, 10) + parseInt(c.late, 10));
        var attending = parseInt(c.late, 10);
        let percent = 0;
        let ignore = true;
        if (total !== 0) {
            percent = Math.round((attending / total) * 100)
            ignore = false;
        }
        return { text: percent + "%", percent: percent, ignore: ignore }
    }


    //yes and late are counted as attending
    calculateAttendanceRate(c) {
        var total = parseInt(c.yes, 10) + parseInt(c.no, 10) + parseInt(c.late, 10) + parseInt(c.pending, 10);
        var attending = parseInt(c.yes, 10) + parseInt(c.late, 10);
        let percent = 0;
        let ignore = true;
        if (total !== 0) {
            percent = Math.round((attending / total) * 100);
            ignore = false;
        }
        return { text: percent + "%", percent: percent, ignore: ignore }
    }

    calculateAverageLateTime(c) {
        var counter = parseInt(c.late, 10);
        let avr = 0;
        let text = "0 min";
        if (counter !== 0) {
            avr = Math.round(parseInt(c.lateTime, 10) / counter);
            text = time.getLateTime(avr);
        }
        return { text: text, time: avr, ignore: false }

    }




}




export let attendanceStore = new AttendanceStore();