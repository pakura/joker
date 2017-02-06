<?php
date_default_timezone_set("UTC");
require_once('inc/connect.php');
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <?php include('inc/header.php')?>
    <script type='text/javascript' src="js/dashboard.js"></script>
</head>
<body onload="connect()" onkeypress="return filtersubmit(event)">
<div class="container">
    <div class="Top_head">
        <?php include('inc/menu.php')?>
    </div>
    <div class="Main_WP">
        <div class="Filter_WP">
            <b>დროის მიხედვით სორტირება</b>: &nbsp;&nbsp;&nbsp; &nbsp;
            <input id="datetimepicker_start" class="datetime" style="width: 150px;" type="text" >
            -დან
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
            <input id="datetimepicker_end" class="datetime" style="width: 150px;" type="text" >
            -მდე
            <button id="search" onclick="search(limit)" style="margin-left: 20px; background-color: #FBAD49; border: none; border-radius: 5px; padding: 7px; color:#FFF; cursor: pointer;">Search</button>
            <script>
                jQuery('.datetime').datetimepicker({
                    format:'Y-m-d',
                    lang:'en'
                });
                var date = new Date();
                var datestart = date.getFullYear()+'-'+(date.getMonth()+1)+'-01';
                var dateend = date.getFullYear()+'-'+(date.getMonth()+1)+'-30';
                $('#datetimepicker_start').val(datestart);
                $('#datetimepicker_end').val(dateend);
            </script>
        </div>


        <div id="Tables_container">
            <div class="TableHead">
                <div class="datetd">Date</div>
                <div class="raketd">Rake</div>
                <div class="raketd">%Clear Rake</div>
                <div class="playernumtd">Num of Players</div>
                <div class="tablenumtd">Num of Matches</div>
                <div class="deposittd">Deposit</div>
                <div class="withdrowtd">Withdrow</div>
            </div>
            <div id="rows">

            </div>
            <div class="footeroftable" style="height: 85px;">
                <div id="total"></div>
                <div id="avarage"></div>
            </div>
        </div>
        <div class="pagecounter">
            <div id="nextbutton" onclick="loadmore()">Load More</div>
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