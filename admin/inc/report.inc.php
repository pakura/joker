<?php
require_once('connect.php');
$db_selected = mysql_select_db('joker2014', $connect);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}
if (!empty($_POST) && isset($_POST['check'])){
    $query = "SELECT `id` FROM `player_report` WHERE `view`=0";
    $result = mysql_query($query);
    if (mysql_num_rows($result)>0){
        echo 'true';
    } else {
        echo 'false';
    }
}

if (!empty($_POST) && isset($_POST['read']) && $_SESSION['admin']['group'] != 3){
    $id = intval($_POST['read']);
    $query = "UPDATE `player_report` SET view=1 WHERE `id`=$id";
    $result = mysql_query($query);
    if ($result){
        echo 'ok';
    }
}

if (!empty($_POST) && isset($_POST['confirm']) && $_SESSION['admin']['group'] != 3){
    $id = intval($_POST['confirm']);
    $query = "UPDATE `player_report` SET view=2 WHERE `id`=$id";
    $result = mysql_query($query);
    if ($result){
        echo 'ok';
    }
}


if (!empty($_POST) && isset($_POST['hide']) && $_SESSION['admin']['group'] != 3){
    $id = intval($_POST['hide']);
    $query = "UPDATE `player_report` SET view=3 WHERE `id`=$id";
    $result = mysql_query($query);
    if ($result){
        echo 'ok';
    }
}


if (!empty($_POST) && isset($_POST['get'])){
    $limit =intval($_POST['limit']);
    $limit = $limit.',20';
    $query = "SELECT * FROM `player_report` WHERE NOT `view` = 3  ORDER BY `id` DESC LIMIT $limit";
    $result = mysql_query($query);
    while ($row = mysql_fetch_assoc($result)){
        echo $row['id'].'~'.$row['table_id'].'~'.$row['reporter'].'~'.$row['player1'].'~'.$row['player2'].'~'.$row['datetime'].'~'.$row['view'].'`';
    }
}
?>