<?php
    require_once('connect.php');
    $db_selected = mysql_select_db('f_accounts_orig', $connect);
    if (!$db_selected) {
        die ('Can\'t use foo : ' . mysql_error());
    }
    if (!empty($_POST) && isset($_POST['userid'])){
        $UserId = filter_var($_POST['userid'], FILTER_SANITIZE_NUMBER_INT);
        $For = filter_var($_POST['for'], FILTER_SANITIZE_NUMBER_INT);
        switch ($For){
            case 1:
                CreatequeryForInfo($UserId);
                break;
            case 2:
                CreatequeryForstat($UserId);
                break;
            case 21:
                CreatequeryFortransaction($UserId);
                break;
            case 3:
                break;
            case 4:
                CreatequeryForIpLog($UserId);
                break;
            case 5:
                break;
        }
    }

    function CreatequeryForInfo($ID){
        $query = "SELECT `acc_id`, `username`, `status` FROM `profile` WHERE `acc_id` = $ID";
        $result = mysql_query($query);
        while ($row = mysql_fetch_assoc($result)) {
            if ($_SESSION["admin"]['group'] == 3){
                $row["status"] .= '-3';
            }
            echo $row["acc_id"].",".$row["username"].",".$row["status"];
        }
    }

    function CreatequeryForstat($ID){
        $query = "SELECT `bal`  FROM `accounts`  WHERE `acc_id` = $ID AND `currency_id` = 13";
        $result = mysql_query($query);
        while ($row = mysql_fetch_assoc($result)) {
            echo $row["bal"];
        }
    }


    function CreatequeryForIpLog($ID){
        $query = "SELECT `ipaddress`, `last_login_date` FROM `iplog`  WHERE `acc_id` = $ID";
        $result = mysql_query($query);
        while ($row = mysql_fetch_assoc($result)) {
            echo $row["ipaddress"].';'.$row["last_login_date"].',';
        }
    }


    function CreatequeryFortransaction($ID){
        $query = "SELECT `tr_id`,`tr_direction`,`tr_amount`,`tr_init_time`  FROM `transactions`  WHERE `tr_type` = 1 AND `currency_id` = 13 AND (`src_acc_id` = $ID OR `dest_acc_id` = $ID)";
        $result = mysql_query($query);
        $deposit = 0;
        $withdraw = 0;
        $deposit_cnt = 0;
        $withdraw_cnt = 0;
        $total = '';
        while ($row = mysql_fetch_assoc($result)) {
            $total .= $row['tr_id'].';'.$row['tr_direction'].';'.$row['tr_amount'].';'.$row['tr_init_time'].',';
            if ($row['tr_direction'] == 2){
                $deposit += $row['tr_amount'];
                $deposit_cnt++;
            }
            if ($row['tr_direction'] == 3){
                $withdraw += $row['tr_amount'];
                $withdraw_cnt++;
            }
        }
        echo $deposit.','.$withdraw.','.$deposit_cnt.','.$withdraw_cnt.','.$total;
    }


    if (!empty($_POST) && isset($_POST['blockuserid']) && $_SESSION["admin"]['group'] != 3){
        $BlockUserId = filter_var($_POST['blockuserid'], FILTER_SANITIZE_NUMBER_INT);
        $Act = filter_var($_POST['act'], FILTER_SANITIZE_NUMBER_INT);
        $text = mysql_real_escape_string($_POST['text']);
        $query = "UPDATE `profile` SET `status` = $Act, `reason` = '".$text."' WHERE `acc_id` = $BlockUserId";
        $result = mysql_query($query) or die('error: '.mysql_error());
        if ($Act == 1){
            echo 'User '.$BlockUserId.' has unblocked,'.$BlockUserId.',1';
        }
        if ($Act == 0){
            echo 'User '.$BlockUserId.' has blocked,'.$BlockUserId.',0';
        }
    }

?>
