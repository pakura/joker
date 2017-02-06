<?php
date_default_timezone_set("Asia/Tbilis");
require_once('inc/connect.php');
$db_selected = mysql_select_db('f_accounts_orig');
if (!$db_selected) {
    die ('Can\'t select db: ' . mysql_error());
}
$thisip = $_SERVER['REMOTE_ADDR'];
$query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES (".$_SESSION['admin']['id'].", '".$_SESSION['admin']['username']."', 'Log Out', '$thisip');";
$result = mysql_query($query);
if (!$result){
    echo error;
} else {
    unset($_SESSION['admin']);
    header('Location: /admin/login.php');
}

