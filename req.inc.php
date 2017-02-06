<?php
if (!empty($_POST)){
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
    if (isset($_POST['banner'])){
        if ($_POST['banner'] === 'true'){
            $query = "SELECT `p_name`, `p_val` FROM `app_room_params` WHERE `room_id` = 11";
            $result = mysql_query($query);
            if (!$result){
                echo 'error';
                return;
            }
            while ($row = mysql_fetch_assoc($result)){
                $banner['title'] = $row['p_name'];
                $banner['msg'] = $row['p_val'];
            }
            echo json_encode($banner);
        }
    }
}
?>