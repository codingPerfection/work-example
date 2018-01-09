
module.exports = {
    //component login
    '/:status': {
        get: [
            {
                input: {
                    status: 'true',
                    authorization: '1234567',
                },
                output: {
                    "events": [
                        {
                            "eventSchedulerId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416c",
                            "status": "pending",
                            "open": "1511192400000",
                            "historyStatus": "false",
                            "openTimezoned": "2017-11-20T16:40:00+01:00",
                            "closeTimezoned": "2017-11-20T23:00:00+01:00",
                            "id": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416ca",
                            "name": "dummy event 2",
                            "close": "1511215200000"
                        },
                        {
                            "eventSchedulerId": "520570f0-bd6e-11e7-ac58-05721c38525a",
                            "status": "open",
                            "open": "1511192400000",
                            "historyStatus": "false",
                            "openTimezoned": "2017-11-20T16:40:00+01:00",
                            "closeTimezoned": "2017-11-20T23:00:00+01:00",
                            "id": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416cadasdas",
                            "name": "dummy event",
                            "close": "1511215200000",
                            "attends": [
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-51995cd0b509",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Ralgorio",
                                    "charType": "dps",
                                    "charClass": "demonHunter"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60gagsae0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0a416121c",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Namon",
                                    "charType": "healer",
                                    "charClass": "paladin"
                                },
                                // {
                                //     "statusChanged": "0",
                                //     "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a4dsadsa16121c",
                                //     "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                //     "lateTime": "15",
                                //     "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                //     "status": "late",
                                //     "charName": "amamenoth",
                                //     "charType": "tank",
                                //     "charClass": "druid"
                                // },
                                // {
                                //     "statusChanged": "0",
                                //     "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a321312416121c",
                                //     "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                //     "lateTime": "15",
                                //     "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                //     "status": "no",
                                //     "charName": "az",
                                //     "charType": "tank",
                                //     "charClass": "warrior"
                                // },
                                // {
                                //     "statusChanged": "0",
                                //     "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                //     "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                //     "lateTime": "15",
                                //     "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                //     "status": "pending",
                                //     "charName": "daretas",
                                //     "charType": "tank",
                                //     "charClass": "warlock"
                                // },
                            ]
                        }]
                }
            },
            {
                input: {
                    status: 'true',
                    authorization: '123456',
                },
                output: {
                    "upcomingEvents": true,
                    "openedEvents": false,
                    "events": [
                        {
                            "eventSchedulerId": "520570f0-bd6e-11e7-ac58-05721c38525a",
                            "status": "open",
                            "open": "1511192400000",
                            "historyStatus": "false",
                            "openTimezoned": "2017-01-03T19:30:00+01:00",
                            "closeTimezoned": "2017-01-03T23:00:00+01:00",
                            "id": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416cadasdas",
                            "name": "Antorus Mythic",
                            "close": "1511215200000",
                            "attends": [
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-51995cd0b509",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Ralgioro",
                                    "charType": "dps",
                                    "charClass": "hunter"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-51995cd0b509",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Blynde",
                                    "charType": "dps",
                                    "charClass": "demonHunter"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a4dsadsa16121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Amamenoth",
                                    "charType": "dps",
                                    "charClass": "druid"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a4dsadsa16121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Whofartd",
                                    "charType": "dps",
                                    "charClass": "druid"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a321312416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Az",
                                    "charType": "dps",
                                    "charClass": "warrior"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Daretas",
                                    "charType": "dps",
                                    "charClass": "warlock"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Guilley",
                                    "charType": "dps",
                                    "charClass": "deathKnight"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Rogchamp",
                                    "charType": "dps",
                                    "charClass": "deathKnight"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Lucrettne",
                                    "charType": "dps",
                                    "charClass": "mage"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Worldend",
                                    "charType": "dps",
                                    "charClass": "monk"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Shinöbu",
                                    "charType": "dps",
                                    "charClass": "priest"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Debic",
                                    "charType": "dps",
                                    "charClass": "rouge"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Gengiwar",
                                    "charType": "dps",
                                    "charClass": "shaman"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0dsadsaa416121c",
                                    "lateTime": "15",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Nojix",
                                    "charType": "dps",
                                    "charClass": "shaman"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-51995cd0b509",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Siljko",
                                    "charType": "tank",
                                    "charClass": "demonHunter"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60gagsae0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0a416121c",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "no",
                                    "charName": "Splìnt",
                                    "charType": "tank",
                                    "charClass": "druid"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60gagsae0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0a416121c",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Namon",
                                    "charType": "healer",
                                    "charClass": "paladin"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60gagsae0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0a416121c",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Rait",
                                    "charType": "healer",
                                    "charClass": "priest"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60gagsae0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0a416121c",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Lerchimantor",
                                    "charType": "healer",
                                    "charClass": "priest"
                                },
                                {
                                    "statusChanged": "0",
                                    "eventId": "ff8d3d70-c8bd-11e7-ae31-e3b60gagsae0a416121c",
                                    "id": "3c87ec43-c9d4-11e7-90ee-e3b6dadasdsa0e0a416121c",
                                    "lateTime": "0",
                                    "userId": "23593530-ba48-11e7-b8ba-35daa67fe276",
                                    "status": "yes",
                                    "charName": "Beastmyhole",
                                    "charType": "healer",
                                    "charClass": "druid"
                                },

                            ]
                        },
                        {
                            "eventSchedulerId": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416c",
                            "status": "pending",
                            "open": "1511192400002",
                            "historyStatus": "false",
                            "openTimezoned": "2017-01-04T19:30:00+01:00",
                            "closeTimezoned": "2017-01-04T23:00:00+01:00",
                            "id": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416ca",
                            "name": "Antorus Mythic",
                            "close": "1511215200000"
                        },
                    ]
                }
            }
        ]
    },
    '/:id/:notify': {
        delete: [
            {
                input: {
                    id: 'ff8d3d70-c8bd-11e7-ae31-e3b60e0a416cadasdas',
                    notify: 'true',
                    authorization: '123456',
                },
                output: {
                    "upcomingEvents": true,
                    "openedEvents": false,
                    "events": [
                        {
                            "eventSchedulerId": "520570f0-bd6e-11e7-ac58-05721c38525a",
                            "status": "pending",
                            "open": "1511192400000",
                            "historyStatus": "false",
                            "openTimezoned": "2017-11-20T16:40:00+01:00",
                            "closeTimezoned": "2017-11-20T23:00:00+01:00",
                            "id": "ff8d3d70-c8bd-11e7-ae31-e3b60e0a416c",
                            "name": "Dummy event 2",
                            "close": "1511215200000"
                        }
                    ]
                }
            }
        ]
    },
    '/:id': {
        put: [
            {
                input: {
                    id: 'ff8d3d70-c8bd-11e7-ae31-e3b60e0a416c',
                    renameEventScheduler: 'true',
                    authorization: '123456',
                    name: 'dummy event 3',
                },
                output: {
                    "renamed": "ok"
                }
            }
        ]
    },
};
