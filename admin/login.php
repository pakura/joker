<?php
    require_once('inc/connect.php');
    $db_selected = mysql_select_db('f_accounts_orig');
    if (!$db_selected) {
        die ('Can\'t use foo : ' . mysql_error());
    }
    $query = "SELECT `allow_ip_addresses` FROM `joker_admins` WHERE 1";
    $result = mysql_query($query);
    $ipaddresses = '';
    while ($row = mysql_fetch_assoc($result)) {
        $ipaddresses .= $row['allow_ip_addresses'].',';
    }
    $ipaddresses = explode(",", $ipaddresses);
    $thisip = $_SERVER['REMOTE_ADDR'];
    if (!in_array($thisip, $ipaddresses)){
        $query = "INSERT INTO `joker_admin_hack_attempt` (`ip`) VALUES ('$thisip')";
        $result = mysql_query($query);
        header('Location: https://lider-bet.com');
    }
?>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <?php include('inc/header.php');
        if (!empty($_GET) && isset($_GET['error'])){
            switch ($_GET['error']){
                case 'password':
                    $text = 'USERNAME ან პაროლი არასწორია!';
                    break;
                case 'ipaddress':
                    $text = 'თქვენ არ გაქვთ წვდომა აღნიშნული IP მისამართით';
                    break;
                default:
                    $text = 'ავტორიზაცია ვერ ხერხდება';
                    break;
            }
        }
    ?>

</head>
<body>
<div style="margin-top: 200px; margin-left: auto; margin-right: auto; width: 320px; height: 50px">
    <img src="img/logo.png">
</div>
<?php
    if (isset($text)){
        echo '<div class="att">'.$text.'</div>';
    }
?>

<div class="login_form">
    <form action="inc/login.inc.php" method="POST">
        <input class="login" type="text" name="username" placeholder="Username" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
        <input class="login" type="password" name="password" placeholder="password">
        <input class="loginbtn" type="submit" name="submit" value="Log In">
    </form>
</div>
</body>
</html>