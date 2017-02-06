<?php
    session_start();
    date_default_timezone_set("Asia/Tbilisi");
    if (!isset($_SESSION["admin"]) && '/admin/login.php' != $_SERVER['PHP_SELF']){
        header('Location: /admin/login.php');
    } else {
        if (time() - $_SESSION["admin"]['timestamp'] > 3600 && $_SERVER['PHP_SELF'] != '/admin/login.php'){
            header('Location: /admin/logout.php');
        }
    }
    $HOST = '';
    $USER = '';
    $PASS = '';
    $connect = mysql_connect($HOST, $USER, $PASS);
    if (!$connect) {
        die('Could not connect: ' . mysql_error());
    }
?>