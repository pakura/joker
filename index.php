<?php
session_start();
date_default_timezone_set('Asia/Tbilisi');
$_SESSION['language'] = isset($_SESSION['language'])?$_SESSION['language']:'';
$Language = "ge";
$LangArray = array("ge", "ru", "en");
if (!empty($_GET) && isset($_GET['lang'])){
    if(in_array($_GET['lang'], $LangArray)) {
        $Language  = $_GET["lang"];
        $_SESSION['language'] = $Language;
    } 
} else {
    if (in_array($_SESSION['language'], $LangArray)) {
        $Language = $_SESSION['language'];
    } else {
    	$_SESSION['language'] = $Language;
    }
}
require_once ('languages/'.$Language.'.inc.php'); 
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Joker - Lobby</title>
	<link rel="stylesheet" href="css/lobby.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
    <link href='http://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
    <script src="js/snap.svg-min.js"></script>
    <script type="text/javascript" src="js/svg.js"></script>
    <script src="js/lobby.js?<?php echo(rand(10,10000)); ?>"></script>
</head>
<body onresize="resize()" onload="resize()">
	<input type="text" id="Player_ID" value="100" style="position:absolute; top:1px; left:1px;"> <button style="position:absolute; top:1px; left:160px;" onclick="login_player()">LogIn</button>
	<div class="tophead"></div>
	<div class="container">
		<div class="header">
			<div class="logo"></div>
            <div class="banner">
                <div class="title"></div>
                <div class="msg"></div>
            </div>
			<div class="toppanel">
				<div class="cashier_btn"></div>
				<div class="warn_btn"></div>
<!--				<div class="setting_btn"></div>-->
				<div class="fullscreen_btn" onclick="toggleFullScreen()"></div>
				<div class="close_btn" onclick="logout()"></div>
			</div>
			<div class="menu_WP">
				<div id="Menu_Game_BTN"></div>
				<!-- <div id="Menu_Tourn_BTN"></div>
				<div id="Menu_Cash_BTN"></div> -->
			</div>
			<div class="bottom_liner"></div>
		</div>
		<div class="content_WP">
			<div class="Cont_top">
				<div class="avatar_WP">
                    <img src="img/noavatar.jpg" width="60px" height="60px" style="border-radius: 100%" / >
				</div>
				<div class="User_info_WP">
					<div class="UserName_WP">
						-
					</div>
					<div class="mid"></div>
					<div class="Balance_WP">
						ბალანსი: <span style="color: #ffca2a;" id="balance">0.00<span style="font-family: Lari; font-size: 22px; margin-left:2px;">L</span></span>
					</div>
				</div>
				<button>პროფილის რედაქტირება</button>
			</div>

			<div style="clear: both"></div>

			<div class="Gear_WP">
				<div class="Left_Gear_WP" id="Gear_content">
					<div style="float:left; width:30%; height:5%"></div>
					<div class="Filter">
						ფილტრი:
					</div>
					<div class="Gear_Filter" id="amount">
						<div id="Amount_Filter_WP" class="Each_Filter_WP">

						</div>
					</div> 
					<div class="Gear_Filter" id="game">
						<div id="GameType_Filter_WP" class="Each_Filter_WP">

						</div>
					</div> 
					<div class="Gear_Filter" id="time">
						<div id="Time_Filter_WP" class="Each_Filter_WP">

						</div>
					</div> 
					<div class="Gear_Filter" id="penalty">
						<div id="PenaltyType_Filter_WP" class="Each_Filter_WP">

						</div>
					</div> 
					<div class="Gear_Filter" id="penalty9">
						<div id="Penalty9_Filter_WP" class="Each_Filter_WP">

						</div>
					</div> 
					<div class="Gear_Filter" id="penalty1">
						<div id="Penalty1_Filter_WP" class="Each_Filter_WP">

						</div>
					</div> 
				</div>
                <div id="right_gear_Wrapper">
                    <div class="Right_Gear_WP">

                    </div>
                    <div class="error_text">

                    </div>
                </div>
			</div>
			<div Class="ActionTable" id="ActionTable">
				<div class="ActionTableText"></div>
			</div>
		</div>
		<div class="footer">
			Time/Date <?php echo date('d.m.y').' '; echo date('h:i')?>
		</div>
	</div>

	<script>
		function resize(){
			var height = document.body.clientHeight;
			var width = document.body.clientWidth;
			var newx = width / 1920;
			var newy =  height / 900;
			if (newx > 1){
			    newx = 1;
			}
			if (newy > 1){
			    newy = 1;
			}
			var coef = newx;
			if (newx > newy){
			    coef = newy;
			}
			//coef*=0.3;

			$('.Gear_WP').css({
			    '-webkit-transform' : 'scale(' + coef + ', '+coef+')',
                '-moz-transform'    : 'scale(' + coef + ', '+coef+')',
                '-ms-transform'     : 'scale(' + coef + ', '+coef+')',
                '-o-transform'      : 'scale(' + coef + ', '+coef+')',
                'transform'         : 'scale(' + coef + ', '+coef+')'
			});
			var position = $('.Gear_WP').position();
			$('.Gear_WP').css({
			    "margin-left": "-"+position.left+"px",
			    "margin-top": "-"+(position.top - 225)+"px"
			});
			height -= 180;
			document.getElementsByClassName('content_WP')[0].style.height = height+'px';
			var fontsize = width * 14 / 2000;
			var actionable = width * 20 / 2000;
			var larisize = width * 20 / 2000;
			document.getElementsByClassName('ActionTableText')[0].style.fontSize = actionable+'px';
		}
	</script>
</body>
</html>