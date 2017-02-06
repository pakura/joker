<?php
    require_once('connect.php');
    $db_selected = mysql_select_db('joker2014', $connect);
    if (!$db_selected) {
        die ('Can\'t use foo : ' . mysql_error());
    }
    if (!empty($_POST) && isset($_POST['limit'])) {
        $limit = intval($_POST['limit']);
        $limit = $limit.',20';
        $from = mysql_real_escape_string($_POST['from']);
        $to = mysql_real_escape_string($_POST['to']);
        GetStat($from, $to, $limit);
    }

    function GetStat($from, $to, $limit){
        $result = mysql_query('CALL write_daily_statistics(NULL)');
        if (!$result){
            die('შეცდომაა, არ ხდება ბაზის განახება. '. mysql_error());
        }
        sleep(0.1);
        $query = "SELECT * FROM `statistics` WHERE `date` BETWEEN '$from' AND '$to' ORDER BY `date` DESC LIMIT $limit";
        $result = mysql_query($query);
        $mainarr = array();
        while ($row = mysql_fetch_assoc($result)) {
            echo $row['date'].';'.$row['rake'].';'.$row['clear_rake'].';'.$row['num_of_unique_players'].';'.$row['num_of_rounds'].';'.$row['deposits'].';'.$row['withdrow'].',';
        }
    }
?>