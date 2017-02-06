<?php
date_default_timezone_set("UTC");
require_once('inc/connect.php');
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <?php include('inc/header.php')?>
    <script type='text/javascript' src="js/transaction.js"></script>
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
    <button id="search" onclick="search()" style="margin-left: 20px; background-color: #FBAD49; border: none; border-radius: 5px; padding: 7px; color:#FFF; cursor: pointer;">Search</button>
    <script>
        jQuery('.datetime').datetimepicker({
            format:'Y-m-d H:i:s',
            lang:'en'
        });
        var date = new Date();
        var datestart = date.getFullYear()+'-'+(date.getMonth()+1)+'-01 00:00:00';
        var dateend = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' 23:49:59';
        $('#datetimepicker_start').val(datestart);
        $('#datetimepicker_end').val(dateend);
    </script>
</div>
<style>
    .datetd{
        width: 180px;
    }
    .playernumtd{
        width: 240px;
    }
    .withdrowtd, .deposittd{
        width: 110px;
    }
</style>

<div id="Tables_container">
    <div class="TableHead">
        <div class="datetd">Date</div>
        <div class="raketd">Table</div>
        <div class="deposittd">Bet</div>
        <div class="playernumtd">Players</div>
        <div class="withdrowtd">Withdrow</div>
        <div class="staketd">Deposit</div>
    </div>
    <div id="rows">
    </div>
    <div class="footeroftable">
        <div id="total"><B>ჯამში</B> stake: 140.00 GEL,  withdrow: 60 GE</div>
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