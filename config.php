<?php
set_time_limit(0);

define('DB_HOST', '112.124.109.112');
define('DB_USER', 'root');
define('DB_PASSWORD', '6edb2016');
define('DB_NAME', 'vcpweb');

header('Content-Type:application/json; charset=UTF-8');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:POST");
header("Access-Control-Allow-Credentials:true");

date_default_timezone_set('Asia/Shanghai');

// 微信公众号appid
const WECHAT_APPID = "wx9c23eb0a5329ce6d";
// 微信公众号appsecret
const WECHAT_APPSECRET = "1568eda6e6b43dc7fe1b7888c695fd6e";
// 微信公众号token
const WECHAT_TOKEN = "6edigital";
// 微信公众号encodingaeskey
const WECHAT_ENCODINGAESKEY = "hIeyDyvqBfH9Oj0e7iZw2ulxdrX1gewFQ4foP71yxD2";
