<?php date_default_timezone_set("UTC");
require_once('inc/connect.php');
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <?php include('inc/header.php')?>

    <script type='text/javascript' src="js/newadmin.js"></script>
    <style>
        label{
            font-family: geo;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="Top_head">
        <?php include('inc/menu.php')?>
    </div>
    <div class="Main_WP">
        <div id="Tables_container">
            <?php if($_SESSION['admin']['group'] == 1){ ?>
            <div style="float: left; width: 100%; height: 30px; color: #FFA800; font-family: geo; font-size: 18px;">ადმინის დამატება</div>
            <div style="float: left; width: 950px; padding: 10px; height: auto; background-color: dimgray; border-radius: 10px;">
                <label for="username">Username: </label><input type="text" name="username" id="username" placeholder="username">
                &nbsp;&nbsp;
                <label for="password">password: </label><input type="password" name="password" id="password" placeholder="password">
                &nbsp;&nbsp;
                <label for="group">Privilege: </label><input type="group" name="group" id="group" placeholder="group">
                &nbsp;&nbsp;
                <label for="ipaddress">allow IP: </label><input type="ipaddress" name="ipaddress" id="ipaddress" placeholder="ipaddress">
                &nbsp;&nbsp;
                <button onclick="addnewadmin()" style="margin-left: 20px; background-color: #FBAD49; border: none; border-radius: 5px; padding: 7px; color:#FFF; cursor: pointer;">დამატება</button>
            </div>
            <?php } ?>
            <div class="admins_wp">
                <div class="admins_header">
                    <div class="admin_id">Id</div>
                    <div class="admin_username">Username</div>
                    <div class="admin_group">Group</div>
                    <div class="admin_ip" style="font-size: 16px;">Allow IP Addresses</div>
                </div>
                <div id="admins">

                </div>
            </div>

        </div>
    </div>
    <div class="clear"></div>
    <div class="fotter">
        <div class="fot">Date: </div>
    </div>
</div>
<script>
    var d = new Date();
    document.getElementsByClassName('fot')[0].innerHTML = d;
</script>
</body>
</html>