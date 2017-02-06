<?php
date_default_timezone_set("UTC");
require_once('connect.php');
$db_selected = mysql_select_db('f_accounts_orig');
if (!$db_selected) {
    die ('Can\'t select db: ' . mysql_error());
}
    if (!empty($_POST) && isset($_POST['username']) && isset($_POST['password'])){
        $username = mysql_real_escape_string($_POST['username']);
        $password = $_POST['password'];
        $pass = mysql_real_escape_string($_POST['password']);
        $password = md5(md5($password).','.md5('iwannabeguy'));
        $ip = $_SERVER['REMOTE_ADDR'];
        $query = "SELECT * FROM `joker_admins` WHERE `username` = '$username' AND `password` = '$password'";
        $result = mysql_query($query);
        if (mysql_num_rows($result) != 1){
            header('Location: /admin/login.php?error=password');
            $query = "INSERT INTO `joker_admin_hack_attempt` (`ip`, `login`, `password`, `pass_hash`) VALUES ('$thisip', '$username', '$pass', '$password')";
            $result = mysql_query($query);
            die();
        }
        $ipaddresses = '';
        $id = 0;
        $group = 3;
        $username ='';
        while ($row = mysql_fetch_assoc($result)) {
            $ipaddresses = $row['allow_ip_addresses'];
            $id = $row['admin_id'];
            $group = $row['groups'];
            $username = $row['username'];
        }
        $ipaddresses = explode(",", $ipaddresses);
        $thisip = $_SERVER['REMOTE_ADDR'];
        if (!in_array($thisip, $ipaddresses)){
            $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES ($id, '$username', 'Loged In (invalid ip)', '$thisip');";
            $result = mysql_query($query);
            header('Location: /admin/login.php?error=ipaddress');
            $query = "INSERT INTO `joker_admin_hack_attempt` (`ip`, `login`, `password`, `pass_hash`) VALUES ('$thisip', '$username', '$pass', '$password')";
            $result = mysql_query($query);
            die();
        }
        $_SESSION["admin"] = array();
        $_SESSION["admin"]['id'] = $id;
        $_SESSION["admin"]['username'] = $username;
        $_SESSION["admin"]['group'] = $group;
        $_SESSION["admin"]['timestamp'] = time();
        $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES ($id, '$username', 'Loged In', '$thisip');";
        $result = mysql_query($query);
        header('Location: /admin/index.php');
    }
?>