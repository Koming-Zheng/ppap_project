/**
 * Created by King on 2017/1/12.
 */

/**
 * Underscore.js 1.7.0
 * @type {Object}
 * @private
 */


var timeHtml = (function () {

    var htmlTime = $('<div/>', {id: "time", class: "time"}).appendTo("body");

    return htmlTime;

})();

var msgCtl = (function () {
    var htmlString = '<div style="position: absolute; top:20%; width: 100%; overflow: hidden"></div>';
    htmlString = $(htmlString).appendTo("body");

    var msg = $('<p id="msg">点错消除连击！错消除连击！错消除连击！重要的事情说三遍。</p>');

    return {
        show: function () {
            htmlString.prepend(msg)
        },
        hide: function () {
            msg.hide();
        }
    }

})();

$(function () {
    var startTime;
    var endTime;
    var totalFight = 0;
    var timeInter1;

    var prefix = './images/ppap/ppap_000';
    var move = [];
    var start;
    var end;
    for (start = 16, end = 64; start <= end; start++) {
        move.push(prefix + prefixInteger(start, 2) + '.jpg')
    }
    var basePath = "http://" + location.host + "/ppap_project/";

    var loader = new WxMoment.Loader();

//声明资源文件列表
    var fileList = [];
    fileList = fileList.concat(move);


    for (var i = 0; i < fileList.length; i++) {
        loader.addImage(basePath + fileList[i]);
    }

//进度监听
    loader.addProgressListener(function (e) {
        var percent = Math.round((e.completedCount / e.totalCount) * 100);
        // console.log("当前加载了", percent, "%");
        //在这里做 Loading 页面中百分比的显示
    });

//加载完成
    loader.addCompletionListener(function () {
        //可以在这里隐藏 Loading 页面开始进入主内容页面
    });

//启动加载
    loader.start();


    var sWidth = $(window).width(), sHeight = $(window).height();
    console.log(sWidth, sHeight);

    $('body').css({width: sWidth, height: sHeight, margin: 0, overflow: "hidden"});

    var s = new C3D.Stage();
    var sp = new C3D.Sprite();
    var p0 = new C3D.Plane();
    var p1 = new C3D.Plane();
    s.size(sWidth, sHeight)
        .update();
    sp.position(0, 0, -s.fov).update();
    p0.size(432, 395).position(0, 0, 0).material({
        image: "images/0.png"
    })
        .update();
    p1.size(422, 384).position(0, 0, 0).material({
        image: "images/1.png"
    }).visibility({alpha: 0}).update();

    sp.addChild(p0);
    sp.addChild(p1);
    s.addChild(sp);

    // var ppapText = new C3D.Plane();
    // ppapText.size(sWidth, 96)
    //     .position(0, -sHeight / 2.5, 0)
    //     .rotation(0, 90, 0)
    //     .id('ppapTitle')
    //     .update();
    // sp.addChild(ppapText);

    // JT.to(ppapText, 0.5, {
    //     onUpdate: function () {
    //         ppapText.updateT()
    //     }, rotationY: 0
    //
    // });


    var timer1 = setInterval(function () {

        if (p0.alpha == 1) {
            p0.visibility({alpha: 0}).updateV();
            p1.visibility({alpha: 1}).updateV()
        }
        else {
            p0.visibility({alpha: 1}).updateV();
            p1.visibility({alpha: 0}).updateV();
        }


    }, 500);

    /*
     var sp2 = new C3D.Sprite();
     sp2.position(0,0,  -s.fov).update();
     for (var i = 0; i < 15; i++) {

     var p00 = new C3D.Plane();

     sp2.size(sWidth, sHeight)
     .update();

     p00.size(432, 395).position(Math.random() * sWidth - sWidth/2, Math.random() * sHeight - sHeight/2, 0).material({
     image: "images/0.png"
     }).update();

     sp2.addChild(p00);


     }
     s.addChild(sp2);
     */

    var p2 = new C3D.Plane();
    p2.size(640, 360)
        .position(0, 0, 0)
        .rotate(0, -90)
        .id("move")
        .material({image: "images/ppap/ppap_00015.jpg"})
        .update();


    sp.addChild(p2);

    $('#mian').append(s.el);

    // $('#ppapTitle').text("全民PPAP");

    setTimeout(function () {

        JT.fromTo(sp, 0.8, {rotationY: 0}, {
            rotationY: 90, ease: JT.Quart.In, onUpdate: function () {
                sp.updateT();
            },
            onEnd: function () {

                $('#move').css({
                    border: "1px solid red",
                    overflow: "hidden",
                    boxSizing: "border-box"
                });
                fightFuc.fightText.html("点红线包围区域<br>开始GAME<br>点击提示的方向键，本大叔就跳舞给你看！");
                // clearInterval(timer1);
                // $('body').css({backgroundColor:"black"})
                ctlKey.init();


                console.log("\n 进入");
            }
        });
        JT.to(p2, 0.8, {
            y: -80, onUpdate: function () {
                p2.updateT()
            }
        })


    }, 1000);

    var timeTotal = function () {

        var timeInter = setInterval(function () {
            timeHtml.html((_.now() - startTime) / 1000);
        }, 100);

        return timeInter;

    };


    $('#move').one('click', gameStarFuc);

    // p2.on('tap',moveHandle);
    var indexMoive = 0;

    function gameStarFuc() {
        startTime = _.now();
        timeInter1 = timeTotal();
        ctlKey.gameStar();
        ctlKey.upKey.on('tap', {orien: "U"}, moveHandle);
        ctlKey.dnKey.on('tap', {orien: "D"}, moveHandle);
        ctlKey.leftKey.on('tap', {orien: "L"}, moveHandle);
        ctlKey.rightKey.on('tap', {orien: "R"}, moveHandle);
        fightFuc.fightText.html("GAME BEGIN");

        bgm.play("M");

        msgCtl.show();

        bgm.bmgM_end.get(0).play();
        bgm.bmgM_end.get(0).muted = true;


    }

    function moveHandle(e) {

        var orien = e.data.orien;
        var orienTrue = danceArray.checkOrien(indexMoive, orien);
        console.log(e.data, indexMoive, orienTrue);
        if (false == orienTrue) {
            totalFight = 1;
            fightFuc.do(totalFight);
            return
        }
        p2.material({image: move[indexMoive]})
            .updateM();
        indexMoive++;
        ctlKey.activeKey(danceArray.danceList[indexMoive]);
        fightFuc.do(++totalFight);
        if (indexMoive == move.length) {
            msgCtl.hide();
            ctlKey.gameEnd();

            ctlKey.upKey.off('tap', moveHandle);
            ctlKey.dnKey.off('tap', moveHandle);
            ctlKey.leftKey.off('tap', moveHandle);
            ctlKey.rightKey.off('tap', moveHandle);

            clearInterval(timeInter1);
            endTime = _.now();
            timeHtml.html((endTime - startTime) / 1000);
            bgm.pause();
            $('#move').off('tap');

            console.log((endTime - startTime) / 1000 + "秒");

            setTimeout(function () {
                gameEndFuc();
                timeHtml.hide();
                JT.to(ctlKey.ctlAre, 0.3, {
                    y: 200, opacity: 0, onEnd: function () {
                        ctlKey.ctlAre.hide()
                    }
                })
            }, 1000);


        }

    }

    function gameEndFuc() {
        $.post("save.php", {
            openid: $userinfo.openid,
            nickname: $userinfo.nickname,
            headimgurl: $userinfo.headimgurl,
            point: totalFight,
            time_interval: endTime - startTime
        }, function (data, status, xhr) {
            // alert(JSON.stringify(data))

        });

        JT.to(sp, 0.4, {
            rotationY: 0, ease: JT.Quart.Out, onUpdate: function () {
                sp.updateT();
            },
            onEnd: function () {
                JT.to(fightFuc.fightText, 0.6, {top: 45, ease: JT.Quart.Out});
                JT.to(sp, 0.3, {
                    y: -sHeight / 3, onUpdate: function () {
                        sp.updateT();
                    }, onEnd: function () {
                        var obj = {num: totalFight};
                        fightFuc.fightText.html("完美连击：" + obj.num + "次");

                        // JT.to(obj,1,{onUpdate:function () {
                        //
                        //     console.log(this);
                        // }});

                        var scoresText = scoresFuc("用时：" + (endTime - startTime) / 1000 + "秒");
                        JT.fromTo(scoresText, 0.3, {top: 55}, {
                            top: 50, ease: JT.Quart.Out, onEnd: function () {
                                rankingList()
                            }
                        });


                    }
                })
            }
        });
        bgm.play("end");
        bgm.bmgM_end.get(0).muted = false
    }

    console.log("%c 会美术就是好，想画什么画什么。", "color:orange", "\n \n 致敬！");

});

function scoresFuc(time) {
    var scores = "";
    scores += '<p style="position: absolute; top: 55%; width: 100%; text-align: center">' + time + '</p>';
    scores = $(scores);
    $('body').append(scores);
    return scores


}

function rankingList() {
    $('<a>', {
        href: "ranking_list.html",
        text: "全民PPAP排行榜"
    }).appendTo('body')
        .wrap('<div style="position: absolute; top: 60%; width: 100%; text-align: center; font-size: 32px"></div>');
}
// function fightFuc(num) {
//     var textHtml ="";
//     textHtml += '<p style="position: absolute; top: 10%; width: 100%; text-align: center" class="">连击'+num+'</p>';
//     $('body').append(textHtml);
//
// }
var fightFuc = (function () {
    var textHtml = "";
    textHtml += '<p style="position: absolute; top: 10%; width: 100%; text-align: center" ></p>';
    textHtml = $(textHtml);
    $('body').append(textHtml);

    return {
        do: function (num) {
            textHtml.html("当前连击：" + num);

            JT.to(textHtml, 0.1, {
                scale: 1.5, onEnd: function () {
                    JT.set(textHtml, {scale: 1})
                }
            })


        },
        hide: function () {
            textHtml.hide();
        },
        fightText: textHtml,


    }
})();

function prefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

// document.addEventListener('touchmove',moveHandle,false);
// function moveHandle(e) {
//     e.preventDefault();
//     e.stopPropagation();
// }
