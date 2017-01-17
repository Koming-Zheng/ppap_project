<?php
include "config.php";

function insertRank($data)
{
    $options = [
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'',
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ];
    $count = 0;
    try {
        $db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD, $options);
        $sth = $db->prepare('INSERT INTO ranks(openid, nickname, headimgurl, point, time_interval, created_at) VALUES (?, ?, ?, ?, ?, ?)');
        $sth->execute([$data['openid'], $data['nickname'], $data['headimgurl'], $data['point'], $data['time_interval'], $data['time']]);
        $count = $sth->rowCount();
    } catch (PDOException $e) {
        //echo $e->getMessage();
    }
    $db = null;
    return $count;
}

$data = [];
$errors = [];
if (strtolower($_SERVER['REQUEST_METHOD']) == 'post') {
    if (!empty($_POST['openid']) && !empty($_POST['nickname']) && !empty($_POST['headimgurl']) && !empty($_POST['point']) && !empty($_POST['time_interval'])) {
        $openid = $_POST['openid'];
        $nickname = $_POST['nickname'];
        $headimgurl = $_POST['headimgurl'];
        $point = $_POST['point'];
        $time_interval = $_POST['time_interval'];


        // if (mb_strlen($username, 'UTF-8') > 10) {
        //     $errors[] = 'username length error';
        // }
        // if (mb_strlen($video_type, 'UTF-8') > 20) {
        //     $errors[] = 'video type length error';
        // }
        // if (preg_match('/^1[3456789][0-9]{9}$/', $mobile) <= 0) {
        //     $errors[] = 'mobile format error';
        // }

        if (count($errors) <= 0) {
            $rankData = ['openid' => $openid, 'nickname' => $nickname, 'headimgurl' => $headimgurl, 'point' => $point, 'time_interval' => $time_interval, 'time' => date('Y-m-d H:i:s')];
            $count = insertRank($rankData);
            if ($count >= 1) {
                $data['errmsg'] = 'ok';
                $data['code'] = '0';
            } else {
                $data['errmsg'] = 'insert error';
                $data['code'] = '6';
            }
        } else {
            $data['errmsg'] = $errors;
            $data['code'] = '4';
        }
    } else {
        $data['errmsg'] = 'input empty';
        $data['code'] = '3';
    }
} else {
    $data['errmsg'] = 'method error';
    $data['code'] = '2';
}
echo json_encode($data);