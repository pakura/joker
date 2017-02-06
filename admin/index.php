<?php
date_default_timezone_set("UTC");
require_once('inc/connect.php');
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <?php include('inc/header.php')?>
</head>
<body onload="connect()">
    <div class="container">
        <div class="Top_head">
             <?php include('inc/menu.php')?>
        </div>
        <div class="Main_WP">
            <?php include('inc/home.php')?>
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