<?php
date_default_timezone_set("UTC");
require_once('inc/connect.php');
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <?php include('inc/header.php')?>

    <script type='text/javascript' src="js/members.js"></script>
</head>
<body onkeypress="return filtersubmit(event)">
    <div class="container">
        <div class="Top_head">
             <?php include('inc/menu.php')?>
        </div>
        <div class="Main_WP">
            <div class="Filter_WP">
                <b>ძებნა:</b>
                 &nbsp;&nbsp; &nbsp;
                User ID
                <input type="text" placeholder="User ID" id="userid">
                &nbsp;&nbsp; &nbsp;
                UserName
                <input type="text" placeholder="user Name" id="username" >
                 &nbsp;&nbsp; &nbsp;
                 Pin
                <input type="text" placeholder="user Ping" id="userpin" disabled>
                &nbsp;&nbsp; &nbsp;
                 Ip
                <input type="text" placeholder="255.255.255.255" id="userip" >
                &nbsp;&nbsp; &nbsp; <button class="btn" onclick="InitFilter(true)">Show Blocked Users</button>
            </div>

            <div id="Tables_container">
            </div>
            <div id="Tables_container">
            </div>
            <div class="pagecounter">
                <div id="nextbutton" onclick="getMoreUsers()">Load More</div>
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
    $( document ).ready(function() {
        $.ajax({
          type: "POST",
          url: "inc/users.inc.php",
          data: { filter: 0, statement: '0', from: 0 }
        })
        .done(function( msg ) {
            showUsers(msg);
            totalrow += 20;
        });
    });
</script>
</body>
</html>