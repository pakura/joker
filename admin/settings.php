<?php
date_default_timezone_set("UTC");
require_once('inc/connect.php');
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <?php include('inc/header.php')?>
    <script type='text/javascript' src="js/settings.js"></script>
</head>
<style>
    input{
        position: relative;
        top: -4px;
        padding-left: 6px;
    }
</style>
<body >
<div class="container">
    <div class="Top_head">
        <?php include('inc/menu.php')?>
    </div>
    <div class="Main_WP">
        <div id="Tables_container">
            <div style="float: left; width: 950px; height: auto; background-color: #666; border-radius: 10px; padding: 10px; font-family: geo;">
                <h2 style="color: #ff8000">თამაშის პარამეტრები: </h2>
                <h4 style="color: #FF9103">მოგების განაწილება:</h4>
                <label for="firstplace">პირველი ადგილი: </label>
                <input type="text" name="firstplace" id="firstplace" value="0" onkeyup="rakechange()">%
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="secondplace">მეორე ადგილი: </label>
                <input type="text" name="secondplace" id="secondplace" value="0" onkeyup="rakechange()">%
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="thirdplace">მესამე ადგილი: </label>
                <input type="text" name="thirdplace" id="thirdplace" value="0" onkeyup="rakechange()">%
                <br><br>
                <center><span id="rakecalc" style="color: #FF9103">რეიკი: 100%</span></center>
                <br><br>
                <?php if ($_SESSION['admin']['group'] == 1){?>
                <center><button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; border-radius: 8px; cursor: pointer" onclick="changerake()">შენახვა</button></center>
                <?php } ?>
                <br><hr>
                <h4 style="color: #FF9103">ფსონების რედაქტირება:</h4>
                <div id="bets">

                </div>
                <br><br>
                <button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; cursor: pointer" onclick="addbet()">+ add</button>
                <br><br>
                <?php if ($_SESSION['admin']['group'] == 1){?>
                <center><button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; border-radius: 8px; cursor: pointer" onclick="changebet()">შენახვა</button></center>
                <?php } ?>
                <br><hr>
                <h4 style="color: #FF9103">ფიქრის დროის რედაქტირება:</h4>
                <div id="timers">

                </div>
                <br><br>
                <button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; cursor: pointer" onclick="addtimer()">+ add</button>
                <br><br>
                <?php if ($_SESSION['admin']['group'] == 1){?>
                <center><button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; border-radius: 8px; cursor: pointer" onclick="changetimer()">შენახვა</button></center>
                <?php } ?>

                <br><hr>
                <h4 style="color: #FF9103">ხიშტების რედაქტირება (ერთიანებში):</h4>
                <div id="penalty1wp">

                </div>
                <button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; cursor: pointer" onclick="addpenalty1()">+ add</button>
                <br><br>
                <?php if ($_SESSION['admin']['group'] == 1){?>
                <center><button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; border-radius: 8px; cursor: pointer" onclick="changepenalty1()">შენახვა</button></center>
                <?php } ?>

                <br><hr>
                <h4 style="color: #FF9103">ხიშტების რედაქტირება (ცხრიანებში):</h4>
                <div id="penalty9wp">

                </div>
                <button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; cursor: pointer" onclick="addpenalty9()">+ add</button>
                <br><br>
                <?php if ($_SESSION['admin']['group'] == 1){?>
                <center><button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; border-radius: 8px; cursor: pointer" onclick="changepenalty9()">შენახვა</button></center>
                <?php } ?>

                <br><hr>
                <h4 style="color: #FF9103">თამაშის ტიპების რედაქტირება:</h4>
                <input type="checkbox" name="gametype1" id="gametype1" value="1" style="top: 5px">
                <label for="gametype1">სტანდარტული</label>
                <br>
                <input type="checkbox" name="gametype2" id="gametype2" value="2" style="top: 5px">
                <label for="gametype2">ცხრიანები (4)</label>
                <br>
                <input type="checkbox" name="gametype3" id="gametype3" value="3" style="top: 5px">
                <label for="gametype3">ცხრიანები (3)</label>
                <br>
                <input type="checkbox" name="gametype4" id="gametype4" value="4" style="top: 5px">
                <label for="gametype4">ცხრიანები (2)</label>
                <br>
                <input type="checkbox" name="gametype5" id="gametype5" value="5" style="top: 5px">
                <label for="gametype5">ცხრიანები (1)</label>
                <br><br>
                <?php if ($_SESSION['admin']['group'] == 1){?>
                    <center><button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; border-radius: 8px; cursor: pointer" onclick="changeGameType()">შენახვა</button></center>
                <?php } ?>
                <br><hr>
                <h4 style="color: #FF9103">ლობის ბანერის რედაქტირება:</h4>
                <input type="text" name="banner_title" id="banner_title" style="width: 200px">
                <label for="banner_title">სათაური</label>
                <br><br>
                <input type="text" name="banner_msg" id="banner_msg" style="width: 400px">
                <label for="banner_msg">ტქსტი</label>
                <br>
                <br>
                <?php if ($_SESSION['admin']['group'] == 1){?>
                    <center><button style="background-color: #ff8000; border: none; padding: 8px; color: #FFF; border-radius: 8px; cursor: pointer" onclick="changebanner()">შენახვა</button></center>
                <?php } ?>
                <br>
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

</body>
</html>