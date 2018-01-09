module.exports = {
    name: "Renascentia",
    server: "EU/argent-dawn",
    eventClass: [
        {
            name: "Antorus normal",
            open: "0 7 * * 2",
            close: "0 8 * * 2",
            archive: "0 9 * * 2"
        },
        {
            name: "Antorus normal",
            open: "30 15 * * 4",
            close: "30 18 * * 4",
            archive: "0 22 * * 4"
        },
        {
            name: "Antorus normal",
            open: "30 15 * * 3",
            close: "30 18 * * 3",
            archive: "0 22 * * 3"
        }
    ]
}