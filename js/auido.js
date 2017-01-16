/**
 * Created by Koming on 2017/1/14.
 */

var bgm = (function () {
    var m;
    var bgm = $('<audio src="audio/ppap_bgm.mp3" ></audio>', {preload: "preload", loop: "loop"})
        .appendTo("body");
    var bgmM = $('<audio src="audio/ppap_bgm_M.mp3" ></audio>', {preload: "preload", loop: "loop"})
        .appendTo("body");


    function selectBgm(bgmType) {
        if (bgmType == "M") {
            return bgmM
        }
        else {
            return bgm
        }
    }

    return {
        play: function (type) {
            m = selectBgm(type).get(0);
            m.play();
            if (m.paused) {
                autoPlayAudio1.init(function () {
                    m.play();


                });
            }

        },
        pause: function () {
            m.pause();
        },
        bgm: bgm,
        bgmM: bgmM
    }

}());

//方法1: 现在微信官方已经推出了微信JS-SDK, 最好还是不要使用"野生"方式, 因为不知道什么时候就可以不能用了!
// http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
// 通过config接口注入权限验证配置后, 在 ready 中 play 一下 audio
var autoPlayAudio1 = (function () {
    wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });


    return {
        init: function (callback) {
            wx.ready(function () {
                if (callback) {
                    callback()
                }
            });

        }
    }
}());
// 方法2: "野生"方法, 借用原来老的 WeixinJSBridge
function autoPlayAudio2() {
    window.onload = function () {
        // alert(typeof WeixinJSBridge);
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            // 在这里拿到 e.err_msg, 这里面就包含了所有的网络类型
            // alert(e.err_msg);
            document.getElementById('bgmusic').play();
        });
    };
}
