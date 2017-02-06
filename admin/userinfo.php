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
<body onkeypress="return filtersubmit(event)">
    <div class="container">
        <div class="Top_head">
             <?php include('inc/menu.php')?>
        </div>
        <div class="Main_WP">
            <div id="Tables_container">
                <div style="float: left; height: auto">
                    <div class="userinfo">
                        <span>User info:</span>
                        <br><br>
                        <div id="userinfo">

                        </div>
                    </div>
                    <div class="userinfo">
                        <span>User Statistics:</span>
                        <br><br>
                        <div id="userstat1">
                            Balance:
                        </div>
                        <div id="userstat2">
                            Rake back: ?
                            <br>
                            Wins: 24
                            <br>
                            Lose: 12
                            <br>
                            Win-Lose: 12
                        </div>
                        <div id="userstat3">
                            Deposit:
                            <br>
                            Withdraw:
                        </div>
                    </div>
                    <div class="userinfo" style="width: 433px">
                        <span>IP Address:</span>
                        <div  style="width: 430px; height: 112px;  overflow: hidden; overflow-y: auto; margin-left: 10px">
                            <table id="iplogs" style="width: 420px">
                            </table>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="PlayedTable_WP">
                    <span>Played Tables:</span>
                    <br><br>
                    <div id="tablehistory">

                    </div>
                </div>
                <hr>
                <div class="PlayedTable_WP">
                    <span>Player Transactions: </span>
                    <br><br>
                    <div id="transaction">

                    </div>
                </div>
            </div>
            <div id="Tables_container">
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
<script type='text/javascript' src="js/profile.js"></script>
</body>
</html>