module.exports.event = () => {
    return {
        open: "arn:aws:sns:eu-central-1:342292996338:attendBot-v02-event-open",
        close: "arn:aws:sns:eu-central-1:342292996338:attendBot-v02-event-close",
        archive: "arn:aws:sns:eu-central-1:342292996338:attendBot-v02-event-archive",
        create: "arn:aws:sns:eu-central-1:342292996338:attendBot-v02-event-create"
    }
}