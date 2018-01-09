import moment from 'moment';


import cronParser from 'cron-parser';

class CronParser {

    nextTimes(openC, closeC, archiveC) {
        var now = new Date();
        now = now.valueOf();
        let openI = cronParser.parseExpression(openC, { iterator: true});
        let open = openI.next();
        let closeI = cronParser.parseExpression(closeC, { iterator: true });
        let close = closeI.next();
        let archiveI = cronParser.parseExpression(archiveC, { iterator: true });
        let archive = archiveI.next();

        //if event opens in 1 minute make event for next week
        /* istanbul ignore next */
        if (now + 1000 * 60 > open.value._date.valueOf()) {
            open = openI.next();
            close = closeI.next();
            archive = archiveI.next();
        }
        return {
            open: open.value._date.utc(),
            close: close.value._date.utc(),
            archive: archive.value._date.utc(),
        }
    }

}

export default CronParser;