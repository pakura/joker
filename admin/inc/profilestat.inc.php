<?php
require_once('connect.php');
$db_selected = mysql_select_db('joker2014', $connect);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}
if (!empty($_POST) && isset($_POST['userid'])) {
    $UserId = filter_var($_POST['userid'], FILTER_SANITIZE_NUMBER_INT);
    $For = filter_var($_POST['for'], FILTER_SANITIZE_NUMBER_INT);
    $limit = isset($_POST['limit'])?$_POST['limit']:'0,20';
    switch ($For){
        case 1:
            CreatequeryForAction($UserId);
            break;
        case 2:
            CreatequeryForPlayedTables($UserId, $limit);
            break;
    }
}


function CreatequeryForPlayedTables($ID, $limit){
    $query_list = "SELECT DISTINCT( `round_id`) FROM `log_actions` WHERE `user_id` = ".$ID;
    $result_list = mysql_query($query_list);
    $arr_list=array();
    while ($row = mysql_fetch_assoc($result_list)) {
        $arr_list[]=$row['round_id'];
    }
    if(count($arr_list)==0){
        return;
    }
    $tables_list = implode(',',$arr_list);
    $query = "SELECT `user_id`,`type`,`round_id`, `amount`, `autodate` FROM `log_actions`  WHERE `round_id` IN(".$tables_list.")AND `type` IN (31,33)";
    $result = mysql_query($query);
    $arr=array();
    while ($row = mysql_fetch_assoc($result)) {
        if (!isset($arr[$row['round_id']])){
            $arr[$row['round_id']] = array();
            $arr[$row['round_id']]['round_id'] = $row['round_id'];
            $arr[$row['round_id']]['date'] = $row['autodate'];
            if (!isset($arr[$row['round_id']]['win'])){
                $arr[$row['round_id']]['win'] = array();
            }
            if (!isset($arr[$row['round_id']]['lose'])){
                $arr[$row['round_id']]['lose'] = array();
            }
            if ($row['type']==33){
                $arr[$row['round_id']]['win'][] = $row['user_id'];
            } else {
                $arr[$row['round_id']]['lose'][] = $row['user_id'];
                $arr[$row['round_id']]['bet'] = $row['amount'];
            }
        } else {
            if ($row['type']==33){
                $arr[$row['round_id']]['win'][] = $row['user_id'];
            } else {
                $arr[$row['round_id']]['lose'][] = $row['user_id'];
            }
        }
    }
    echo json_encode($arr);
}


function CreatequeryForAction($ID){
    $query = "SELECT `amount`,`type`  FROM `log_actions`  WHERE `user_id` = $ID AND `type` IN (33,41,32)";
    $result = mysql_query($query);
    $win = 0;
    $win_cnt = 0;
    $lose = 0;
    $lose_cnt = 0;
    while ($row = mysql_fetch_assoc($result)) {
        if ($row['type'] == 33 || $row['type'] == 32){
            $win += $row['amount'] /100;
            $win_cnt++;
            $lose_cnt--;
        }
        if ($row['type'] == 41){
            $lose += $row['amount'] / 100;
            $lose_cnt++;
        }
    }
    echo $win.','.$lose.','.$win_cnt.','.$lose_cnt;
}

?>