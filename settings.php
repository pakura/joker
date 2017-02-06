<?php
if (!empty($_POST) && isset($_POST['user'])){
    $HOST = '';
    $USER = '';
    $PASS = '';
    $connect = mysql_connect($HOST, $USER, $PASS);
    if (!$connect) {
        echo 'error';
    }
    $db_selected = mysql_select_db('joker2014', $connect);
    if (!$db_selected) {
        echo 'error';
    }
    $user = intval($_POST['user']);
//    $query = "SELECT setting_id, setting FROM user_settings where user_id = $user AND game_id = '6' AND setting_id in (6,7,8,9,10)";
    $setting = array();
    $setting['setting'] = array();
    $setting['user_option'] = array();
    $query  = "SELECT setting_id, settings FROM user_option";
    $result = mysql_query($query);
    while ($row = mysql_fetch_assoc($result)){
        $setting['setting'][$row['setting_id']] = array();
        $setting['setting'][$row['setting_id']] = explode(',', $row['settings']);
    }
    $query  = "SELECT setting_id, setting FROM user_settings where user_id = $user AND game_id = '6' AND setting_id in (6,7,8,9,10)";
    $result = mysql_query($query);
    while ($row = mysql_fetch_assoc($result)){
        $setting['user_option'][$row['setting_id']] = array();
        $setting['user_option'][$row['setting_id']] = $row['setting'];
    }
    echo json_encode($setting);
}
?>