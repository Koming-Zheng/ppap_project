/**
 * Created by Koming on 2017/1/14.
 */
var danceArray = (function () {
    var orientationArr = ["U", "D", "L", "R"];
    var danceList = [];
    var m = 3, n = 0;// 0 到 3 随机整数

    var arrIndex = 0;
    for (var i = 1; i <= 49; i++) {

        // arrIndex = Math.round(Math.random() * m - n);
        arrIndex = _.random(0,3);
        danceList.push(orientationArr[arrIndex]);

    }
    console.log("方向表：", danceList);


    function checkOrien(arrIndex, orien) {
        var resultBool = false;

        resultBool = danceList[arrIndex] === orien;

        return resultBool;
    }

    return {
        danceList: danceList,
        checkOrien: function (arrIndex, orien) {
            return checkOrien(arrIndex, orien);
        }
    }
}());
