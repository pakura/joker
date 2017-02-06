<?php
date_default_timezone_set("UTC");
require_once('inc/connect.php');
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <?php include('inc/header.php')?>
    <style>
        .report_item{
            float: left;
            width: 950px;
            height: 16px;
            padding: 10px;
            margin-bottom: 4px;
            background-color: #2c3e50;
            border-radius: 6px;
            color: #FFF;
            font-family: geo;
            font-size: 13px;
        }
        .table_id{
            float: left;
            width: 110px;
            color: #ff8000;
            cursor: pointer;
        }
        .reporter{
            float: left;
            width: 160px;
        }
        .reported{
            float: left;
            width: 250px;
        }
        .datetime{
            float: left;
            width: 240px;
        }
        .unview{
            float: right;
            width: auto;
            height: 100%;
            padding: 10px;
            background-color: indianred;
            cursor: pointer;
            margin-top: -10px;
        }
        .view{
            float: right;
            width: auto;
            height: 100%;
            padding: 10px;
            background-color: coral;
            cursor: default;
            margin-top: -10px;
        }
        .confirmed{
            float: right;
            width: auto;
            height: 100%;
            padding: 10px;
            background-color: #27ae60;
            cursor: default;
            margin-top: -10px;
        }
        .confirm{
            float: left;
            width: 30px;
            height: 100%;
            margin-top: -5px;
            cursor: pointer;
            opacity: 0.8;
        }
        .confirm:hover{
            opacity: 1;
        }
    </style>
</head>
<body onkeypress="return filtersubmit(event)">
<div class="container">
    <div class="Top_head">
        <?php include('inc/menu.php')?>
    </div>
    <div class="Main_WP">
        <div id="Tables_container">
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
    $( document ).ready(function() {
        getreport();
        reportchecker();
    });
    var d = new Date();
    document.getElementsByClassName('fot')[0].innerHTML = d;
</script>
</body>
</html>