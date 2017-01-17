/**
 * Created by King on 2016/12/30.
 */
/**
 * Created by Administrator on 2015/10/21.
 */
var wechat = (function ($) {
    'use strict';

    var appId,
        timestamp,
        nonceStr,
        signature,
        wxOptions,
        shareFunc;

    function wxReady() {
        wx.config({
            debug: wxOptions.debug,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: [
                "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"
            ]
        });

        wx.ready(function () {
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: wxOptions.shareTitle,
                link: wxOptions.shareLink,
                imgUrl: wxOptions.shareImg,
                success: function () {
                    if (shareFunc) {
                        shareFunc.timeLineSuccess();
                    }
                },
                cancel: function () {
                    if (shareFunc) {
                        shareFunc.timeLineCancel();
                    }
                }
            });
            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: wxOptions.shareTitle,
                desc: wxOptions.shareDesc,
                link: wxOptions.shareLink,
                imgUrl: wxOptions.shareImg,
                type: '',
                dataUrl: '',
                success: function () {
                    if (shareFunc) {
                        shareFunc.appMessageSuccess();
                    }
                },
                cancel: function () {
                    if (shareFunc) {
                        shareFunc.appMessageCancel();
                    }
                }
            });
        });

        wx.error(function (res) {
            // alert(res.errMsg);
        });
    }

    function wxConnect() {

        $.ajax({
            type: 'get',
            data: wxOptions.data,
            url: wxOptions.serverUrl,

            success: function (data) {
                appId = data.appId;
                timestamp = data.timestamp;
                nonceStr = data.nonceStr;
                signature = data.signature;


                wxReady();
            },
            error: function () {
                console.log('Connect Weixin Server Error!');
            }
        });
    }

    return {
        init: function (options, callback) {
            if (callback) {
                shareFunc = callback;
            }
            if (!options) {
                console.log('Please set wechat config');
            } else {
                wxOptions = options;
                return wxConnect();
            }
        },
        reset: function (options, callback) {
            if (callback) {
                shareFunc = callback;
            }
            if (options) {
                wxOptions = options;
            }
            return wxReady();
        }
    };
})($);

function isWechat() {
    var browser = window.navigator.userAgent.toLowerCase();
    return browser.match(/MicroMessenger/i) == "micromessenger";
}
