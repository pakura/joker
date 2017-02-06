<?php
require_once('connect.php');
$db_selected = mysql_select_db('joker2014', $connect);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}

if (!empty($_POST) && isset($_POST['init'])){
    if ($_POST['init'] == 'true'){
        $query = "SELECT `room_id`, `p_name`, `p_val` FROM `app_room_params` WHERE 1";
        $result = mysql_query($query);
        $mainarr = array();
        while ($row = mysql_fetch_assoc($result)) {
            if ($row['p_name'] == 'win_percents'){
                $mainarr['win_percents'] = $row['p_val'];
            }
            if ($row['p_name'] == 'stakes'){
                $mainarr['stakes'] = $row['p_val'];
            }
            if ($row['p_name'] == 'delay_player_turns'){
                $mainarr['timer'] = $row['p_val'];
            }
            if ($row['p_name'] == 'joker_types'){
                $mainarr['jokertype'] = $row['p_val'];
            }
            if ($row['p_name'] == 'penalty_amounts8'){
                $mainarr['penalty1'] = $row['p_val'];
            }
            if ($row['p_name'] == 'penalty_amounts9'){
                $mainarr['penalty9'] = $row['p_val'];
            }
            if ($row['p_name'] == 'max_wait_time'){
                $mainarr['maxtimer'] = $row['p_val'];
            }
            if ($row['room_id'] == '11'){
                $mainarr['banner']['title'] = $row['p_name'];
                $mainarr['banner']['msg'] = $row['p_val'];
            }
        }
        echo json_encode($mainarr);
    }
}

if (!empty($_POST) && isset($_POST['rake'])) {
    $rake = mysql_real_escape_string($_POST['rake']);
    $query = "UPDATE `app_room_params` SET `p_val` = '".$rake."' WHERE `p_name` = 'win_percents'";
    $result = mysql_query($query);
    if (!$result){
        echo 'შეცდომაა. ვერ მოხდა რეიქის რედაქტირება. '.mysql_error();
    } else {
        echo 'რეიქი წარმატებით დარედაქტირდა.';
        $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES ('".$_SESSION['admin']['username']."', '".$_SESSION['admin']['username']."', 'edit rake', '$thisip');";
        $result = mysql_query($query);
    }
}

if (!empty($_POST) && isset($_POST['bet'])) {
    $rake = mysql_real_escape_string($_POST['bet']);
    $query = "UPDATE `app_room_params` SET `p_val` = '".$rake."' WHERE `p_name` = 'stakes'";
    $result = mysql_query($query);
    if (!$result){
        echo 'შეცდომაა. ვერ მოხდა ფსონების რედაქტირება. '.mysql_error();
    } else {
        echo 'ფსონები წარმატებით დარედაქტირდა.';
        $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES ('".$_SESSION['admin']['username']."', '".$_SESSION['admin']['username']."', 'edit stake', '$thisip');";
        $result = mysql_query($query);
    }
}

if (!empty($_POST) && isset($_POST['timers'])) {
    $timer = mysql_real_escape_string($_POST['timers']);
    $query = "UPDATE `app_room_params` SET `p_val` = '".$timer."' WHERE `p_name` = 'delay_player_turns'";
    $result = mysql_query($query);
    if (!$result){
        echo 'შეცდომაა. ვერ მოხდა ტაიმერის რედაქტირება. '.mysql_error();
    } else {
        echo 'ტაიმერები წარმატებით დარედაქტირდა.';
        $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES ('".$_SESSION['admin']['username']."', '".$_SESSION['admin']['username']."', 'edit timer', '$thisip');";
        $result = mysql_query($query);
    }
}

if (!empty($_POST) && isset($_POST['penalty1'])) {
    $timer = mysql_real_escape_string($_POST['penlaty1']);
    $query = "UPDATE `app_room_params` SET `p_val` = '".$timer."' WHERE `p_name` = 'penalty_amounts8'";
    $result = mysql_query($query);
    if (!$result){
        echo 'შეცდომაა. ვერ მოხდა ერთიანებში ხიშტის რედაქტირება. '.mysql_error();
    } else {
        echo 'ერთიანებში ხიშტი წარმატებით დარედაქტირდა.';
        $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES ('".$_SESSION['admin']['username']."', '".$_SESSION['admin']['username']."', 'edit penlaty1', '$thisip');";
        $result = mysql_query($query);
    }
}

if (!empty($_POST) && isset($_POST['penalty9'])) {
    $timer = mysql_real_escape_string($_POST['penalty9']);
    $query = "UPDATE `app_room_params` SET `p_val` = '".$timer."' WHERE `p_name` = 'penalty_amounts9'";
    $result = mysql_query($query);
    if (!$result){
        echo 'შეცდომაა. ვერ მოხდა ცხრიანებში ხიშტის რედაქტირება. '.mysql_error();
    } else {
        echo 'ცხრიანებში ხიშტი წარმატებით დარედაქტირდა.';
        $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES ('".$_SESSION['admin']['username']."', '".$_SESSION['admin']['username']."', 'edit penlaty9', '$thisip');";
        $result = mysql_query($query);
    }
}


if (!empty($_POST) && isset($_POST['gametype'])) {
    $timer = mysql_real_escape_string($_POST['gametype']);
    $query = "UPDATE `app_room_params` SET `p_val` = '".$timer."' WHERE `p_name` = 'joker_types'";
    $result = mysql_query($query);
    if (!$result){
        echo 'შეცდომაა. ვერ მოხდა თამაშის ტიპების რედაქტირება. '.mysql_error();
    } else {
        echo 'თამაშის ტიპები წარმატებით დარედაქტირდა.';
        $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES ('".$_SESSION['admin']['username']."', '".$_SESSION['admin']['username']."', 'edit game type', '$thisip');";
        $result = mysql_query($query);
    }
}

if (!empty($_POST) && isset($_POST['bannermsg'])) {
    $title = mysql_real_escape_string($_POST['banner']);
    $msg = mysql_real_escape_string($_POST['bannermsg']);
    $query = "UPDATE `app_room_params` SET `p_name` = '".$title."', `p_val` = '".$msg."'  WHERE `room_id` = 11";
    $result = mysql_query($query);
    if (!$result){
        echo 'შეცდომაა. ვერ მოხდა ბანერის რედაქტირება. '.mysql_error();
    } else {
        echo 'ბანერი წარმატებით დარედაქტირდა.';
        $query = "INSERT INTO `admin_log` (`admin_id`, `admin_username`, `actions`, `ipaddress`) VALUES ('".$_SESSION['admin']['username']."', '".$_SESSION['admin']['username']."', 'change lobby banner', '$thisip');";
        $result = mysql_query($query);
    }
}

?>