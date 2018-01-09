window.onload = function () {

    var apiUrl = 'https://api.impbots.com/v02/';
    var attendCode = window.location.href.substr(window.location.href.indexOf('/a/') + 3, window.location.href.length);
    var fullUrl = apiUrl + 'attend/' + attendCode;

    var getE = function (a) {
        return document.getElementById(a);
    }
    var lastOption = '';

    function sendResponse(res) {
        getE('loader').style.display = 'block';
        getE('content').style.display = 'none';
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                var data = JSON.parse(xmlhttp.responseText);
                if (data.codeExists) {
                    loadResponse(data);
                } else {
                    getE('loader').style.display = 'none';
                    getE('error').style.display = 'block';
                }
            }
        }
        xmlhttp.open("POST", fullUrl, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(res));
    }


    getE('cancelResponse').addEventListener('click', function () {
        getE('o1').style.display = 'block';
        getE('o2').style.display = 'none';
        getE('o3').style.display = 'none';
    })

    getE('clickNo').addEventListener('click', function () {
        sendResponse({
            response: 'no'
        });
    })

    getE('clickYes').addEventListener('click', function () {
        sendResponse({
            response: 'yes'
        });
    });

    getE('clickLate').addEventListener('click', function () {
        getE('o1').style.display = 'none';
        getE('o2').style.display = 'none';
        getE('o3').style.display = 'block';
        getE('contentInfo').style.display = 'none';
    })

    getE('lateBack').addEventListener('click', function () {
        getE('contentInfo').style.display = 'block';
        getE('o3').style.display = 'none';
        getE('o1').style.display = 'block';
        getE('o2').style.display = 'none';
    })

    function lateBtnClicked(e) {
        sendResponse({
            response: 'late',
            lateTime: this.getAttribute("lateTime")
        });
    }

    var lateButtons = getE('lateBtns').childNodes;
    for (var i = 0; i < lateButtons.length; i++) {
        lateButtons[i].addEventListener('click', lateBtnClicked);
    }



    function loadResponse(data) {
        getE('contentInfo').style.display = 'block';
        getE('loader').style.display = 'none';
        getE('content').style.display = 'block';
        if (data.responseStatus == 'pending') {
            getE('o1').style.display = 'block';
            getE('o2').style.display = 'none';
            getE('o3').style.display = 'none';
        } else if (data.responseStatus == 'yes') {
            getE('o1').style.display = 'none';
            getE('o2').style.display = 'block';
            getE('o3').style.display = 'none';

            getE('responseYes').style.display = 'inline-block';
            getE('responseNo').style.display = 'none';
            getE('responseLate').style.display = 'none';
        } else if (data.responseStatus == 'no') {
            getE('o1').style.display = 'none';
            getE('o2').style.display = 'block';
            getE('o3').style.display = 'none';

            getE('responseYes').style.display = 'none';
            getE('responseNo').style.display = 'inline-block';
            getE('responseLate').style.display = 'none';
        } else if (data.responseStatus == 'late') {
            getE('o1').style.display = 'none';
            getE('o2').style.display = 'block';
            getE('o3').style.display = 'none';

            getE('responseYes').style.display = 'none';
            getE('responseNo').style.display = 'none';
            getE('responseLate').style.display = 'inline-block';
            var late = parseInt(data.lateTime);
            var str = '';
            var min = late % 60;
            var h = Math.floor(late / 60);
            if (late / 60 >= 1) {
                str += h + 'h ';
            }
            if (min != 0) {
                str += min + 'min'
            }
            getE('responseLateTime').innerHTML = str;
        }
    }

    function loadEvent() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                var data = JSON.parse(xmlHttp.responseText);
                if (data.codeExists) {
                    getE('charName').innerHTML = data.charName;
                    getE('guild').innerHTML = data.guildName;
                    getE('eventName').innerHTML = data.eventName;

                    var openM = moment(data.openTimezoned);
                    var closeM = moment(data.closeTimezoned);
                    var nowM = moment();

                    //calculate in
                    var minutesDiff = openM.diff(nowM, 'minutes');
                    var inHours = Math.floor(minutesDiff / 60);
                    var inMinutes = minutesDiff % 60;
                    if (inHours != 0) {
                        getE('timeIn').innerHTML = inHours + 'h ' + inMinutes + 'min';
                    } else {
                        getE('timeIn').innerHTML = inMinutes + 'min';
                    }

                    //calculate open close
                    getE('timeFromTo').innerHTML = openM.format('H') + ":" + openM.format('mm') + " - " + closeM.format('H') + ":" + closeM.format("mm")

                    loadResponse(data);
                } else {
                    getE('loader').style.display = 'none';
                    getE('error').style.display = 'block';
                }
            }

        }
        xmlHttp.open("GET", fullUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
    loadEvent();


}