<?php
@session_start();
$Language = "ge";
require_once ('languages/'.$Language.'.inc.php'); 
if (isset($_GET) && !empty($_GET) && $_GET['tableid']){
    $TableId = filter_var($_GET['tableid'], FILTER_SANITIZE_NUMBER_INT);
    $UserID = filter_var($_GET['userid'], FILTER_SANITIZE_NUMBER_INT);
    $Stage = filter_var($_GET['stage'], FILTER_SANITIZE_NUMBER_INT);
    $Round = filter_var($_GET['round'], FILTER_SANITIZE_NUMBER_INT);
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Lider-Bet Joker - Table: #<?php if ($_GET['id'] != '') echo $_GET['id']?></title>
	<link rel="stylesheet" href="css/joker.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
    <link href='http://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
    <script>
        var ses_id = '<?php echo session_id() ?>';
        var admin_id = <?php echo $_SESSION["admin"]['id'] ?>;
    </script>
    <script type='text/javascript' src="js/settings.js"></script>
    <script type='text/javascript' src="js/template.js"></script>
    <script type='text/javascript' src="js/game.admin.js?<?php echo(rand(10,10000)); ?>"></script>
    <script type='text/javascript' src="js/split.admin.js?<?php echo(rand(10,10000)); ?>"></script>
    <script type="text/javascript" src="http://jqueryrotate.googlecode.com/svn/trunk/jQueryRotate.js"></script>
    <script type="text/javascript" src="js/jquery.cross-slide.js"></script>
</head>

<script>
    $( document ).ready(function() {
        login_player(<?php echo $TableId.', '.$UserID ?>);
    });
    var Stage = <?php echo $Stage?>;
    var Round = <?php echo $Round?>;
</script>

<body onresize="winresize()" onload="">
	<div id="setting_btn"></div>
	<div id="sound_btn"></div>
	<div id="fullscreen_btn"></div>
	<div id="close_btn"  onclick="window.close();"></div>
	<div id="bet_amount_WP">
		<div id="bet_top"><?php echo $lang['bet'] ?></div>
		<div id="bet_mid">0</div>
		<div id="bet_bottom"><?php echo $lang['score'] ?></div>
	</div>
	<div id="my_balance_WP">
		<div id="balance_top"><?php echo $lang['balance'] ?></div>
		<div id="balance_mid">0</div>
		<div id="balance_bottom"><?php echo $lang['score'] ?></div>
	</div>
	<div class="container" id="table">
        <div id="trump_card_WP">
            <img src="img/cards/under.png" id="trump_card">
        </div>

        <div class="horizontal_timer" id="P0timer"></div>
        <div class="vetical_timer" id="P1timer"></div>
        <div class="horizontal_timer" id="P2timer"></div>
        <div class="vetical_timer" id="P3timer"></div>

        <div id="RobotPlay" class="robotPlay" onclick="ContinueGame()">გაგრძელება</div>
        <div id="player1_avatar" class="avatar">
        	<img src="http://a.pix.ge/w/wxz24.jpg" style="border-radius: 100px; border:none;" id="avatar1">
        </div>
        <div id="player1_name" class="player_name"></div>
        <div id="player1_score" class="player_score">0 / -</div>
        <div id="player1" class="position">
        	<div class="left_avatar_wp" id="left_avatar_1"></div>
        	<div class="right_avatar_wp" id="right_avatar_1"></div>
        </div>
        <div id="player2_avatar" class="avatar">
        	<img src="http://a.pix.ge/w/wxz24.jpg" style="border-radius: 100px" id="avatar2">
        </div>
        <div id="player2_name" class="player_name"></div>
        <div id="player2_score" class="player_score">0 / -</div>
        <div id="player2" class="position">
        	<div class="top_avatar_wp" id="top_avatar_2"></div>
        	<div class="down_avatar_wp" id="down_avatar_2"></div>
        </div>
        <div id="player3_avatar" class="avatar">
        	<img src="http://a.pix.ge/w/wxz24.jpg" style="border-radius: 100px; border:none;" id="avatar3">
        </div>
        <div id="player3_name" class="player_name"></div>
        <div id="player3_score" class="player_score">0 / -</div>
        <div id="player3" class="position">
        	<div class="left_avatar_wp" id="left_avatar_3"></div>
        	<div class="right_avatar_wp" id="right_avatar_3"></div>
        </div>
         <div id="player4_avatar" class="avatar">
        	<img src="http://a.pix.ge/w/wxz24.jpg" style="border-radius: 100px; border:none;" id="avatar4">
        </div>
        <div id="player4_name" class="player_name"></div>
        <div id="player4_score" class="player_score">0 / -</div>
        <div id="player4" class="position">
        	<div class="top_avatar_wp" id="top_avatar_4"></div>
        	<div class="down_avatar_wp" id="down_avatar_4"></div>
        </div>
        <div id="players_name">
        	<div id="PL0" class="playersname"></div>
        	<div id="PL1" class="playersname"></div>
        	<div id="PL2" class="playersname"></div>
        	<div id="PL3" class="playersname"></div>
        </div>
        <div id="paper_WP"> 

        </div>
        <div id="FullPaperBTN" onclick="showadminpaper()">სრული ქაღალდი</div>
        <div id="stoptableBTN" onclick="showstop()">თამაშის შეწყვეტა</div>
        <div id="pouse_game" onclick="pouseGame()"></div>
        <div id="stoptable_wp">

            <div class="stophead">
                თანხის დაბრუნება
                <br>
                (მინიშშნეთ მოთამაშეები ვისაც უნდა დაუბრუნდეს თანხა)
            </div>
            <div class="selectplayer">
                <input type="checkbox" id="stoppl1" name="stoppl1"><label for="stoppl1" id="lstoppl1">player</label>
                <input type="checkbox" id="stoppl2" name="stoppl2"><label for="stoppl2" id="lstoppl2">player</label>
                <input type="checkbox" id="stoppl3" name="stoppl3"><label for="stoppl3" id="lstoppl3">player</label>
                <input type="checkbox" id="stoppl4" name="stoppl4"><label for="stoppl4" id="lstoppl4">player</label>
            </div>
            <div class="stoptext">
                <textarea id="stopmessage" placeholder="დაწერეთ მიზეზი"></textarea>
            </div>
            <div class="button_WP">
                <button onclick="sendstop()">თამაშის შეწყვეტა</button>
                <button onclick="$('#stoptable_wp').fadeOut('slow')">გაუქმება</button>
            </div>
        </div>
        <div id="P0ThrownCardAnimate"></div>
        <div id="P1ThrownCardAnimate"></div>
        <div id="P2ThrownCardAnimate"></div>
        <div id="P3ThrownCardAnimate"></div>
        <div id="Cards_for_player0">
    	</div>
    	<div class="table">
            <div class="tableRow">
                <div id="Cards_for_player1">
                </div>
            </div>
        </div>
    	<div id="Cards_for_player2">
    	</div>
    	<div class="table">
            <div class="tableRow">
                <div id="Cards_for_player3">
                </div>
            </div>
        </div>
    	<div id="player0_thrown_card"></div>
    	<div id="player1_thrown_card"></div>
    	<div id="player2_thrown_card"></div>
    	<div id="player3_thrown_card"></div>
    	<div id="jokercall1">მაღალი გული</div>
    	<div id="jokercall2">მოჯოკვრა</div>
        <div id="claim_WP">
            აირჩიე კოზირი:<br>
            <div style="position:relative; float:left; height: 10%; width:100%"></div>
            <img src="img/cards/none.png" height="50%" onmouseover="this.src='img/cards/none1.png'" onmouseout="this.src='img/cards/none.png'" onclick="SetTrump(4)">&nbsp;&nbsp;
            <img src="img/cards/h.png" height="50%" onmouseover="this.src='img/cards/h1.png'" onmouseout="this.src='img/cards/h.png'" onclick="SetTrump(0)">&nbsp;&nbsp;
            <img src="img/cards/x.png" height="50%" onmouseover="this.src='img/cards/x1.png'" onmouseout="this.src='img/cards/x.png'" onclick="SetTrump(2)">&nbsp;&nbsp;
            <img src="img/cards/o.png" height="50%" onmouseover="this.src='img/cards/o1.png'" onmouseout="this.src='img/cards/o.png'" onclick="SetTrump(1 )">&nbsp;&nbsp;
            <img src="img/cards/s.png" height="50%" onmouseover="this.src='img/cards/s1.png'" onmouseout="this.src='img/cards/s.png'" onclick="SetTrump(3)">
        </div>
        <div id="ChooseHowMany_WP">
            შენი სიტყვა:<br>
            <div style="position:relative; float:left; height: 10%; width:100%"></div>
            <button style="width:auto;" onclick="SetHowMany(0)" id='call0' disabled>პასი</button>
            <button onclick="SetHowMany(1)" id='call1' disabled>1</button>
            <button onclick="SetHowMany(2)" id='call2' disabled>2</button>
            <button onclick="SetHowMany(3)" id='call3' disabled>3</button>
            <button onclick="SetHowMany(4)" id='call4' disabled>4</button>
            <button onclick="SetHowMany(5)" id='call5' disabled>5</button>
            <button onclick="SetHowMany(6)" id='call6' disabled>6</button>
            <button onclick="SetHowMany(7)" id='call7' disabled>7</button>
            <button onclick="SetHowMany(8)" id='call8' disabled>8</button>
            <button onclick="SetHowMany(9)" id='call9' disabled>9</button>
        </div>
        <div id="OnJokerAction_WP">
            <div style="position:relative; float:left; height: 15%; width:100%"></div>
            <button onclick="JokerAction('1,-1')"><?php echo $lang['jokerover'] ?></button>
            <button onclick="JokerAction('0,-1')"><?php echo $lang['jokerunder'] ?></button>
        </div>
        <div id="FirstJokerAction_WP">
            <div style="position:relative; float:left; height: 15%; width:100%"></div>
            <span style="font-family: GEO_M; color: #CCC; float:left; padding: 2%; padding-right: 6%; padding-left: 6%; "><?php echo $lang['high'] ?>: </span>
            <img src="img/cards/h.png" height="30%" onmouseover="this.src='img/cards/h1.png'" onmouseout="this.src='img/cards/h.png'" onclick="JokerAction('1,0')">&nbsp;&nbsp;
            <img src="img/cards/x.png" height="30%" onmouseover="this.src='img/cards/x1.png'" onmouseout="this.src='img/cards/x.png'" onclick="JokerAction('1,2')">&nbsp;&nbsp;
            <img src="img/cards/o.png" height="30%" onmouseover="this.src='img/cards/o1.png'" onmouseout="this.src='img/cards/o.png'" onclick="JokerAction('1,1')">&nbsp;&nbsp;
            <img src="img/cards/s.png" height="30%" onmouseover="this.src='img/cards/s1.png'" onmouseout="this.src='img/cards/s.png'" onclick="JokerAction('1,3')">
            <div style="position:relative; float:left; height: 10%; width:100%"></div>
            <span style="font-family: GEO_M; color: #CCC; float:left; padding: 2%; padding-right: 6%; padding-left: 6%; "><?php echo $lang['takeaway'] ?>: </span>
            <img src="img/cards/h.png" height="30%" onmouseover="this.src='img/cards/h1.png'" onmouseout="this.src='img/cards/h.png'" onclick="JokerAction('0,0')">&nbsp;&nbsp;
            <img src="img/cards/x.png" height="30%" onmouseover="this.src='img/cards/x1.png'" onmouseout="this.src='img/cards/x.png'" onclick="JokerAction('0,2')">&nbsp;&nbsp;
            <img src="img/cards/o.png" height="30%" onmouseover="this.src='img/cards/o1.png'" onmouseout="this.src='img/cards/o.png'" onclick="JokerAction('0,1')">&nbsp;&nbsp;
            <img src="img/cards/s.png" height="30%" onmouseover="this.src='img/cards/s1.png'" onmouseout="this.src='img/cards/s.png'" onclick="JokerAction('0,3')">
        </div>
        <div id="LastGoted" onclick="LastGoted()" title="ბოლოს წაყვანილი"></div>
        <div id="LastGot_WP">
            <div id="PLayer1_card" class="lastcard"></div>
            <div id="PLayer2_card" class="lastcard"></div>
            <div id="PLayer3_card" class="lastcard"></div>
            <div id="PLayer0_card" class="lastcard"></div>
        </div>
	</div>
    <div id="settings_wp">
        <div style="float: left; width: 100%; height: auto; margin-top: -2%">
            <h3>პარამეტრები</h3>
        </div>
        <div class="btn" onclick="showsetting(1, this)" >უკანა ფონი</div>
        <div class="changebg" id="stgn_1">
            <img src="img/tumbbackground0.png" class="option" onclick="changebg(0, this)">
            <img src="img/tumbbackground1.png" class="option" onclick="changebg(1, this)" style="border: 2px solid #e74c3c">
            <img src="img/tumbbackground2.png" class="option" onclick="changebg(2, this)">
            <img src="img/tumbbackground4.png" class="option" onclick="changebg(4, this)">
            <img src="img/tumbbackground6.png" class="option" onclick="changebg(6, this)">
        </div>
        <div class="btn" onclick="showsetting(2, this)">მაგიდის ფონი</div>
        <div class="changebg" id="stgn_2" style="height: 0px">
            <img src="img/tumbtablebg0.PNG" class="option" onclick="changetablebg(0, this)">
            <img src="img/tumbtablebg1.PNG" class="option" onclick="changetablebg(1, this)">
            <img src="img/tumbtablebg2.PNG" class="option" onclick="changetablebg(2, this)">
            <img src="img/tumbtablebg3.PNG" class="option" onclick="changetablebg(3, this)">
            <img src="img/tumbtablebg4.PNG" class="option" onclick="changetablebg(4, this)">
        </div>
        <div class="btn" onclick="showsetting(3, this)" >ბანქოს ფონი</div>
        <div class="changebg" id="stgn_3" style="height: 0px">
            <img src="img/tumbunder0.png" class="cardoption" onclick="changecardbg(0)">
            <img src="img/tumbunder1.png" class="cardoption" onclick="changecardbg(1)">
            <img src="img/tumbunder2.png" class="cardoption" onclick="changecardbg(2)">
            <img src="img/tumbunder3.png" class="cardoption" onclick="changecardbg(3)">
            <img src="img/tumbunder4.png" class="cardoption" onclick="changecardbg(4)">
        </div>
        <div class="btn" onclick="showsetting(4, this)">ოფციები ფონი</div>
    </div>
	<div class="warning" id="wrn1"></div>
    <div class="warning" id="wrn2"></div>
    <div class="warning" id="wrn3"></div>
    <div id="wrn1_popup">
        <div class="wrn_title">PLAYER 2 თამაშობს პარაში</div>
        <button onclick="sendworn('1,2')">player 2</button>
        <button onclick="sendworn('1,3')">player 3</button>
        <div class="wrn_title">თან</div>
    </div>
    <div id="wrn2_popup">
        <div class="wrn_title">PLAYER 3 თამაშობს პარაში</div>
        <button onclick="sendworn('2,1')">player 2</button>
        <button onclick="sendworn('2,3')">player 3</button>
        <div class="wrn_title">თან</div>
    </div>
    <div id="wrn3_popup">
        <div class="wrn_title">PLAYER 4 თამაშობს პარაში</div>
        <button onclick="sendworn('3,1')">player 2</button>
        <button onclick="sendworn('3,2')">player 3</button>
        <div class="wrn_title">თან</div>
    </div>
    <div id="terminate"><span>თამაში შეწყდა! </span><br></div>
	<div id="Game_info">
	<span id="stake"><i>ფსონი:</i> 0 ლარი</span>, <span id="joktype"><i>თამაში:</i> სრული</span>, <span id="jokpenalty"><i>ხიშტი:</i> სპეცი</span>, <span id="penlatyaction"><i>წაგლეჯვა:</i> 2</span>
	</div>
    <!-- <div class="Game_Type_WP"><?php echo $lang['xishti'] ?></div> -->
    <div id="WIN" style="display:none">
        <div id="Win_WP"></div>
        <div id="WIN0" class="WinPos"></div>
        <div id="WIN1" class="WinPos"></div>
        <div id="WIN2" class="WinPos"></div>
        <div id="WIN3" class="WinPos"></div>
        <div class="Win_Pos_Num_BG" id="winnumbg0">1</div>
        <div class="Win_Pos_Num_BG" id="winnumbg1">2</div>
        <div class="Win_Pos_Num_BG" id="winnumbg2">3</div>
        <div class="Win_Pos_Num_BG" id="winnumbg3">4</div>
        <div class="wintext" id="P0WIN">
                <span>Player 1</span><br>0.00<br>ლარი
        </div>
        <div class="wintext" id="P1WIN">
                <span>Player 2</span><br>0.00<br>ლარი
        </div>
        <div class="wintext" id="P2WIN">
            <span>Player 3</span><br>0.00<br>ლარი
        </div>
        <div class="wintext" id="P3WIN">
            <span>Player 4</span><br>0.00<br>ლარი
        </div>
    </div>
    <div class="gameoverbg"></div>
    <div id="closeover_btn"  onclick="window.close();"></div>
    <div class="reloadbg"></div>
    <div class="bubblingG">
        <center>CONNECTING...</center>
        <br><br>
        <span id="bubblingG_1"></span>
        <span id="bubblingG_2"></span>
        <span id="bubblingG_3"></span>
    </div>
    <div id="adminPaper"></div>
</body>
</html>