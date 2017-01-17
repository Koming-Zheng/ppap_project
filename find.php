<?php
include "config.php";

function findRanks()
{
    $options = [
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'',
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ];
    $list = [];
    try {
        $db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD, $options);
        $sth = $db->prepare('SELECT `id`, `openid`, `nickname`, `headimgurl`, MIN(`time_interval`) as `time_interval`, `point` FROM `ranks` GROUP BY `openid` ORDER BY `time_interval` ASC ');
        $sth->execute();
        $list = $sth->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        //echo $e->getMessage();
    }
    $db = null;
    return $list;
}

$data = [];
$errors = [];
if (strtolower($_SERVER['REQUEST_METHOD']) == 'post') {
   $ranks = findRanks();
   $data['ranks'] = $ranks;
} else {
    $data['errmsg'] = 'method error';
    $data['code'] = '2';
}
echo json_encode($data);