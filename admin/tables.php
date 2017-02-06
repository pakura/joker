<?php
date_default_timezone_set("UTC");
require_once('inc/connect.php');
$sesid = session_id();
$userid = $_SESSION['admin']['id'];
$db_selected = mysql_select_db('f_accounts_orig', $connect);
$query = "UPDATE joker_admins SET ses='$sesid' WHERE admin_id = $userid";
$result = mysql_query($query);

?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <script>
        <?php echo 'var admin_id = '.$_SESSION["admin"]['id'].';' ?>
        <?php echo 'var session_id = \''.$sesid.'\';' ?>
    </script>

    <?php include('inc/header.php')?>
    <script type='text/javascript' src="js/tables.js"></script>
</head>
<body onload="connect()" onkeypress="return filtersubmit(event)">
    <div class="container">
        <div class="Top_head">
             <?php include('inc/menu.php')?>
        </div>
        <div class="Main_WP">
            <div class="detail_WP">
                <div style="color: #FFA319; cursor:pointer; float: right; margin-right: 10px; margin-top: -15px;" onclick="$('.detail_WP').hide('slow');">Close</div>
                <div id="detailinner">
                    Wait...
                </div>
            </div>
            <div class="opentable_WP">
                <div style="color: #FFA319; cursor:pointer; float: right; margin-right: 10px; margin-top: -15px;" onclick="$('.opentable_WP').hide('slow');">Close</div>
                <div id="tablestage">
                    Wait...
                </div>
            </div>

            <div class="Filter_WP">
                მაგიდის ძებნა:
                <input type="text" placeholder="Table ID" id="tableid">
                &nbsp;&nbsp; &nbsp;
                მოთამაშის ID ით მაგიდის ძებნა
                <input type="text" placeholder="Id1,Id2,Id3..." id="userid" >
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input id="datetimepicker_start" class="datetime" type="text" >
                დან&nbsp;
                <input id="datetimepicker_end" class="datetime" type="text" >
                <script>
                    jQuery('.datetime').datetimepicker({
                      format:'d.m.Y H:i',
                      lang:'en'
                    });
                </script>
                მდე
            </div>

            <div id="Tables_container">
            </div>
            <div class="pagecounter">
                <div id="nextbutton" onclick="Get_Tables(20,totaltables)">Load More</div>
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