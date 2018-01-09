
module.exports = {
    //component login
    '/invite/': {
        get: [
            {
                input: {
                    authorization: '123456'
                },
                output: {
                    url: 'http://impbots.com/register/38129328dsa9idsakRenascentia'
                }
            }
        ]
    },
    '/kick/:id': {
        delete: [
            {
                input: {
                    authorization: '123456',
                    id: '1111'
                },
                output: {
                    ok: true
                }
            }
        ]
    },
    '/attendance/': {
        get: [
            {
                input: {
                    authorization: '123456'
                },
                output: {
                    attendance: [
                        {
                            "editable": "yes",
                            "charName": "Ralgorio",
                            "created": "1509020450445",
                            "charClass": "hunter",
                            "charType": "dps",
                            "id": "1111",
                            "no": "0",
                            "yes": "3",
                            "lateTime": "5",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "1",
                            "pending": "1"
                        },
                        {
                            "editable": "yes",
                            "charName": "Blynde",
                            "created": "1509020450445",
                            "charClass": "demonHunter",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6712312fe276",
                            "no": "0",
                            "yes": "4",
                            "lateTime": "0",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "1",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Amamenoth",
                            "created": "1509020450445",
                            "charClass": "druid",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "5",
                            "lateTime": "10",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "2",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Whofartd",
                            "created": "1509020450445",
                            "charClass": "druid",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "6",
                            "lateTime": "2",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "1",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Az",
                            "created": "1509020450445",
                            "charClass": "warrior",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "7",
                            "lateTime": "4",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "2",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Daretas",
                            "created": "1509020450445",
                            "charClass": "warlock",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "8",
                            "lateTime": "2",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "1",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Guilley",
                            "created": "1509020450445",
                            "charClass": "deathKnight",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "8",
                            "lateTime": "30",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "1",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Rogchamp",
                            "created": "1509020450445",
                            "charClass": "deathKnight",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "9",
                            "lateTime": "30",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "1",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Lucrettne",
                            "created": "1509020450445",
                            "charClass": "mage",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "13",
                            "lateTime": "30",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "1",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Shinöbu",
                            "created": "1509020450445",
                            "charClass": "priest",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "13",
                            "lateTime": "0",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "0",
                            "pending": "0"
                        },
                        {
                            "editable": "no",
                            "charName": "Beastmyhole",
                            "created": "1509020450445",
                            "charClass": "druid",
                            "charType": "healer",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "9",
                            "lateTime": "5",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "1",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Rait",
                            "created": "1509020450445",
                            "charClass": "priest",
                            "charType": "healer",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "1",
                            "yes": "10",
                            "lateTime": "7",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "1",
                            "pending": "1"
                        },
                        {
                            "editable": "no",
                            "charName": "Namon",
                            "created": "1509020450445",
                            "charClass": "paladin",
                            "charType": "healer",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "2",
                            "yes": "10",
                            "lateTime": "3",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "5",
                            "pending": "0"
                        },

                        {
                            "editable": "no",
                            "charName": "siljko",
                            "created": "1509020450445",
                            "charClass": "demonHunter",
                            "charType": "tank",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "2",
                            "yes": "6",
                            "lateTime": 600,
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "12",
                            "pending": "0"
                        },
                    ]
                }
            },
            {
                input: {
                    authorization: '1234567'
                },
                output: {
                    attendance: [
                        {
                            "editable": "yes",
                            "charName": "Ralgorio",
                            "created": "1509020450445",
                            "charClass": "hunter",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "no": "0",
                            "yes": "1",
                            "lateTime": "0",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "0",
                            "pending": "3"
                        },
                        {
                            "editable": "yes",
                            "charName": "Ralgorio",
                            "created": "1509020450445",
                            "charClass": "hunter",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6712312fe276",
                            "no": "0",
                            "yes": "1",
                            "lateTime": "0",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "0",
                            "pending": "3"
                        },
                        {
                            "editable": "no",
                            "charName": "Ralgorio",
                            "created": "1509020450445",
                            "charClass": "hunter",
                            "charType": "dps",
                            "id": "1a94a3d0-ba48-11e7-b8ba-35daa6731321fe276",
                            "no": "0",
                            "yes": "1",
                            "lateTime": "0",
                            "userId": "1a94a3d0-ba48-11e7-b8ba-35daa67fe276",
                            "late": "0",
                            "pending": "3"
                        },
                    ]
                }
            }
        ]
    },
};