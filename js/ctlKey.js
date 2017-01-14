/**
 * Created by Koming on 2017/1/14.
 */
var ctlKey = (function () {
    var upKey, dnKey, leftKey, rightKey;
    upKey = $('<button />', {text: "上", class: "ctl-key", id: "up-key"});
    dnKey = $('<button />', {text: "下", class: "ctl-key", id: "dn-key"});
    leftKey = $('<button />', {text: "左", class: "ctl-key", id: "left-key"});
    rightKey = $('<button />', {text: "右", class: "ctl-key", id: "right-key"});

    var ctlAre = $('<div/>', {id: "ctl-are"});

    upKey.prependTo(ctlAre);
    dnKey.prependTo(ctlAre);
    leftKey.prependTo(ctlAre);
    rightKey.prependTo(ctlAre);

    function activeKey(orien) {

        switch (orien) {
            case "U":
                upKey.addClass("active");
                upKey.siblings().removeClass("active");
                break;
            case "D":
                dnKey.addClass("active");
                dnKey.siblings().removeClass("active");
                break;
            case "L":
                leftKey.addClass("active");
                leftKey.siblings().removeClass("active");
                break;
            case "R":
                rightKey.addClass("active");
                rightKey.siblings().removeClass("active");
                break;
        }



    }


    return {
        init: function () {
            ctlAre.appendTo("body");
        },
        activeKey:function (orien) {
            activeKey(orien);
        },
        gameStar: function (callback) {
            ctlKey.activeKey(danceArray.danceList[0]);
            callback && callback();
        },
        gameEnd: function (callback) {
            ctlAre.children(".active").removeClass("active");
            callback && callback();
        },
        upKey:upKey,
        dnKey:dnKey,
        leftKey:leftKey,
        rightKey:rightKey,
        ctlAre:ctlAre
    }


}());