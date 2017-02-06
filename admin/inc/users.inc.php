<?php
    require_once('connect.php');
    $db_selected = mysql_select_db('f_accounts_orig', $connect);
    if (!$db_selected) {
        die ('Can\'t use foo : ' . mysql_error());
    }
    if (!empty($_POST) && isset($_POST['filter'])){
        $filter = filter_var($_POST['filter'], FILTER_SANITIZE_NUMBER_INT);
        $from = filter_var($_POST['from'], FILTER_SANITIZE_NUMBER_INT);
        $statement = mysql_real_escape_string($_POST['statement']);
        switch ($filter){
            case 0:
                CreateFullQuery($from);
                break;
            case 1:
                CreateIdQuery($statement);
                break;
            case 2:
                CreateUserNameQuery($statement);
                break;
            case 3:
                CreateUserNameQuery($statement);
                break;
            case 4:
                CreateIpQuery($statement);
                break;
            case 5:
                CreateBlockedUserQuery();
                break;
            default:
                echo 'default';
                break;
        }
    }
    function RunQuery($query){
        $result = mysql_query($query);
        while ($row = mysql_fetch_assoc($result)) {
            echo $row["acc_id"].";".$row["username"].";".$row["bal"].",";
        }
    }
    function CreateFullQuery($from){
        $query = "SELECT `profile`.`acc_id`, `profile`.`username`,`accounts`.`bal` FROM `profile`,`accounts` WHERE `profile`.`acc_id` = `accounts`.`acc_id` AND `accounts`.`currency_id` = 13  LIMIT 20 OFFSET $from";
        RunQuery($query);
    }
    function CreateIdQuery($id){
        $query = "SELECT `profile`.`acc_id`, `profile`.`username`,`accounts`.`bal` FROM `profile`,`accounts` WHERE `profile`.`acc_id` = `accounts`.`acc_id` AND `accounts`.`currency_id` = 13 AND `profile`.`acc_id` = $id";
        RunQuery($query);
    }
    function CreateUserNameQuery($username){
        $query = "SELECT `profile`.`acc_id`, `profile`.`username`,`accounts`.`bal` FROM `profile`,`accounts` WHERE `profile`.`acc_id` = `accounts`.`acc_id` AND `accounts`.`currency_id` = 13 AND `profile`.`username` = '$username'";
        RunQuery($query);
    }
    function CreateIpQuery($ip){
        $query = "SELECT `profile`.`acc_id`, `profile`.`username`,`accounts`.`bal` FROM `profile`,`accounts`,`iplog` WHERE `profile`.`acc_id` = `iplog`.`acc_id` AND `profile`.`acc_id` = `accounts`.`acc_id` AND `accounts`.`currency_id` = 13 AND `iplog`.`ipaddress` = '$ip'";
        RunQuery($query);
    }
    function CreateBlockedUserQuery(){
        $query = "SELECT `profile`.`acc_id`, `profile`.`username`,`accounts`.`bal` FROM `profile`,`accounts` WHERE `profile`.`acc_id` = `accounts`.`acc_id` AND `accounts`.`currency_id` = 13 AND `profile`.`status` = 0";
        RunQuery($query);
    }
?>