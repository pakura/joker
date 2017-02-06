<?php
require_once('connect.php');
$db_selected = mysql_select_db('f_accounts_orig', $connect);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}
if (!empty($_POST) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['group']) && isset($_POST['ipaddres'])){
    $username = mysql_real_escape_string($_POST['username']);
    $password = $_POST['password'];
    $password = md5(md5($password).','.md5('iwannabeguy'));
    $group = intval($_POST['group']);
    $ipaddresses = mysql_real_escape_string($_POST['ipaddres']);
    $query = "INSERT INTO `joker_admins` (`username`, `password`, `groups`, `allow_ip_addresses`) VALUES ('$username', '$password', $group, '$ipaddresses');";

    $result = mysql_query($query);
    if (!$result){
        echo 'ვერ ხერხდება ადმინის დამატება '.mysql_error();
        die;
    }
    $thisip = $_SERVER['REMOTE_ADDR'];
    $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES (".$_SESSION["admin"]['id'].", '".$_SESSION["admin"]['username']."', 'Add New admin (".$username.")', '$thisip');";
    $result = mysql_query($query);
    if (!$result){
        echo 'ვერ ხერხდება ბაზაში შეტანა';
    } else {
        echo 'ადმინი '.$username.' წარმატებით დაემატა';
    }
}
if (!empty($_POST) && isset($_POST['get'])){
    if ($_POST['get'] == 'true'){
        $query = "SELECT * FROM `joker_admins` WHERE 1";
        $result = mysql_query($query);
        while ($row = mysql_fetch_assoc($result)){
            if ($_SESSION['admin']['group'] == 1){
                echo $row['admin_id'].'~'.$row['username'].'~'.$row['groups'].'~'.$row['allow_ip_addresses'].'`';
            } else {
                echo '-1~'.$row['username'].'~'.$row['groups'].'~'.$row['allow_ip_addresses'].'`';
            }

        }
    }
}

if (!empty($_POST) && isset($_POST['update']) && $_SESSION['admin']['group'] == 1){
    if ($_POST['update'] == 'true'){
        if (isset($_POST['id'])){
            $id = intval($_POST['id']);
            $username = mysql_real_escape_string($_POST['username']);
            $group = intval($_POST['group']);
            $ip = mysql_real_escape_string($_POST['ip']);
            $query = "UPDATE `joker_admins` SET `username`= '$username', `groups`= $group, `allow_ip_addresses` = '$ip' WHERE `admin_id` = $id";
            $result = mysql_query($query);
            if (!$result){
                echo 'რედაქტირება ვერ ხდება. '.mysql_error();
            } else {
                $thisip = $_SERVER['REMOTE_ADDR'];
                $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES (".$_SESSION["admin"]['id'].", '".$_SESSION["admin"]['username']."', 'Edit admin (".$username.")', '$thisip');";
                $result = mysql_query($query);
                if (!$result){
                    echo 'ვერ ხერხდება ბაზაში შეტანა';
                } else {
                    echo 'ok';
                }
            }
        } else {
            echo 'შეცდომაა, არ შემოვიდა admin ID';
        }
    }
}

if (!empty($_POST) && isset($_POST['delete']) && $_SESSION['admin']['group'] == 1){
    $id = intval($_POST['id']);
    $query = "DELETE FROM `joker_admins` WHERE `admin_id` = $id";
    $result = mysql_query($query);
    if (!$result){
        echo 'რედაქტირება ვერ ხდება. '.mysql_error();
    } else {
        $thisip = $_SERVER['REMOTE_ADDR'];
        $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES (".$_SESSION["admin"]['id'].", '".$_SESSION["admin"]['username']."', 'Delete admin (id: ".$id.")', '$thisip');";
        $result = mysql_query($query);
        if (!$result){
            echo 'ვერ ხერხდება ბაზაში შეტანა';
        } else {
            echo 'ok '.$_SESSION["admin"]['username'];
        }
    }
}
?>