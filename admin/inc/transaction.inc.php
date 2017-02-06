<?php
require_once('connect.php');
$db_selected = mysql_select_db('joker2014', $connect);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}
if (!empty($_POST) && isset($_POST['from']) && isset($_POST['to'])) {
    $from = mysql_real_escape_string($_POST['from']);
    $to = mysql_real_escape_string($_POST['to']);
    $limit = mysql_real_escape_string($_POST['limit']);
    GetTransactions($from, $to, $limit);
}


function GetTransactions($from, $to, $limit){
    $query = "SELECT `autodate`, `type`, `user_id`, `round_id`, `amount` FROM `log_actions` WHERE `room_id` = 1 AND `type` IN(31,33) AND `autodate` BETWEEN '".$from."' AND '".$to."' ORDER BY `autodate` DESC  LIMIT ".$limit;
    $result = mysql_query($query);
    $mainarr = array();
    while ($row = mysql_fetch_assoc($result)) {
        if (!isset($mainarr[$row['round_id']])){
            $mainarr[$row['round_id']] = array();
            $mainarr[$row['round_id']]['date'] = $row['autodate'];
            $mainarr[$row['round_id']]['table'] = $row['round_id'];
            $mainarr[$row['round_id']]['stake'] = array();
            $mainarr[$row['round_id']]['players'] = array();
            $mainarr[$row['round_id']]['players']['win'] = array();
            $mainarr[$row['round_id']]['players']['lose'] = array();
            $mainarr[$row['round_id']]['stake']['win'] = 0;
            $mainarr[$row['round_id']]['stake']['lose'] = 0;
            if ($row['type'] == 33){
                if (!in_array($row['user_id'], $mainarr[$row['round_id']]['players']['win'])){
                    $mainarr[$row['round_id']]['stake']['win'] += $row['amount'];
                    $mainarr[$row['round_id']]['players']['win'][] = $row['user_id'];
                }
            } else {
                if (!in_array($row['user_id'], $mainarr[$row['round_id']]['players']['lose'])){
                    $mainarr[$row['round_id']]['stake']['lose'] += $row['amount'];
                    $mainarr[$row['round_id']]['players']['lose'][] = $row['user_id'];
                }
            }
        } else {
            if ($row['type'] == 33){
                if (!in_array($row['user_id'], $mainarr[$row['round_id']]['players']['win'])){
                    $mainarr[$row['round_id']]['stake']['win'] += $row['amount'];
                    $mainarr[$row['round_id']]['players']['win'][] = $row['user_id'];
                }
            } else {
                if (!in_array($row['user_id'], $mainarr[$row['round_id']]['players']['lose'])){
                    $mainarr[$row['round_id']]['stake']['lose'] += $row['amount'];
                    $mainarr[$row['round_id']]['players']['lose'][] = $row['user_id'];
                }
            }
        }
    }
    echo json_encode($mainarr);
}
?>