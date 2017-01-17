<?php

include("./auth.php");

$scope = "snsapi_userinfo";
$we_obj = new Wechat($options);
$json = $we_obj->getOauthAccessToken();


if ($json !== false){
    $userinfo = $we_obj->getOauthUserinfo($json['access_token'], $json['openid']);

    $userinfo = json_encode($userinfo);
?>
<script>var $userinfo = <?php echo $userinfo; ?></script>
<script>console.log($userinfo)</script>
<?php
} else {

    $url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    $oauth_url = $we_obj->getOauthRedirect($url, "", $scope);
    header('Location: ' . $oauth_url);

}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=640, user-scalable=no">
    <title>全民PPAP</title>
    <link rel="stylesheet" href="css/app.css">
    <script src="//wximg.qq.com/wxp/libs/wxmoment/0.0.4/wxmoment.min.js"></script>
    <script src="lib/jstween/jstween.min.js"></script>
    <script src="lib/css3d-engine/css3d.min.js"></script>
    <script>
        var _ = require('./lib/underscore');
        var options = {
            debug: false,
            shareImg: $userinfo.headimgurl || "http://display.6edigital.com/images/share.jpg",
            shareLink: location.href.split("?")[0],
            shareTitle: '没玩没成绩',
            shareDesc: '全民PPAP',
            data:{
                appUrl:location.href.split("#")[0]
            },
            serverUrl:'http://display.6edigital.com/wechat_6e/wxconfig.php'
        };

    </script>
</head>
<body>
<div id="mian"></div>
<script src="//res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
<script src="js/wechat.js"></script>
<script src="js/auido.js"></script>
<script src="js/danceArray.js"></script>
<script src="js/ctlKey.js"></script>
<script src="js/app.js"></script>
<script>
    bgm.play("start");
    wechat.init(options);
</script>
</body>
</html>
