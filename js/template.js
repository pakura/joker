var sound = true;
var defaultsize;
var allObjects=[{name:"Cards_for_player0",x:510,y:880,w:1000,h:140},{name:"Cards_for_player1",x:200,y:550,w:140,h:500},{name:"Cards_for_player2",x:544,y:180,w:964,h:140},{name:"Cards_for_player3",x:1666,y:550,w:140,h:500},
    {name:"trump_card_WP",x:1671,y:121,w:144,h:206},{name:"trump_card",w:144,h:206}, {name:"player1",x:850,y:1070,w:295,h:80}, {name:"player3",x:850,y:50,w:295,h:80},
    {name:"left_avatar_1",x:850,y:1070,w:210,h:80}, {name:"right_avatar_1",x:1060,y:1070,w:85,h:80},{name:"left_avatar_3",x:850,y:50,w:210,h:80}, {name:"right_avatar_3",x:1060,y:50,w:85,h:80},
    {name:"player2",x:60,y:444,w:80,h:295},{name:"player4",x:1860,y:444,w:80,h:295},
    {name:"top_avatar_2",x:40,y:447,w:80,h:85},{name:"down_avatar_2",x:40,y:444,w:80,h:210}, {name:"top_avatar_4",x:1860,y:444,w:80,h:85},{name:"down_avatar_4",x:1860,y:444,w:80,h:210},
    {name:"setting_btn",x:1690,y:24,w:26,h:26},{name:"sound_btn",x:1740,y:24,w:29,h:26},{name:"fullscreen_btn",x:1794,y:24,w:27,h:26},{name:"close_btn",x:1860,y:20,w:104,h:34},
    {name:"bet_amount_WP",x:60,y:1038,w:110,h:110},{name:"bet_top",x:60,y:1030,w:110,h:32,f:22},{name:"bet_mid",x:60,y:1070,w:110,h:48,f:40},{name:"bet_bottom",x:60,y:1120,w:110,h:28,f:20},
    {name:"my_balance_WP",x:182,y:1038,w:110,h:110,},{name:"balance_top",x:60,y:1030,w:110,h:32,f:22},{name:"balance_mid",x:60,y:1070,w:110,h:48,f:40},{name:"balance_bottom",x:60,y:1120,w:110,h:28,f:20},
    {name:"player1_avatar",x:855,y:1074,w:72,h:72},{name:"player1_name",x:940,y:1100,w:200,h:30,f:20},{name:"player1_score",x:1076,y:1096,w:200,h:30,f:24},{name:"avatar1",x:854,y:1072,w:72,h:72},
    {name:"player2_avatar",x:64,y:663,w:72,h:72},{name:"player2_name",x:2,y:530,w:200,h:30,f:20},{name:"player2_score",x:-17,y:386,w:230,h:30,f:24},{name:"avatar2",x:63,y:660,w:72,h:72},
    {name:"player3_avatar",x:856,y:55,w:72,h:72},{name:"player3_name",x:940,y:80,w:200,h:30,f:20},{name:"player3_score",x:1076,y:73,w:200,h:30,f:24},{name:"avatar3",x:854,y:1074,w:72,h:72},
    {name:"player4_avatar",x:1864,y:663,w:72,h:72},{name:"player4_name",x:1804,y:530,w:200,h:30,f:20},{name:"player4_score",x:1784,y:386,w:230,h:30,f:24},{name:"avatar4",x:63,y:664,w:72,h:72},
    {name:"player0_thrown_card",x:950,y:610,w:102,h:140},{name:"player1_thrown_card",x:840,y:520,w:102,h:140},{name:"player2_thrown_card",x:950,y:450,w:102,h:140},{name:"player3_thrown_card",x:1061,y:520,w:102,h:140},
    {name:"players_name",x:66,y:30},{name:"claim_WP",x:822,y:760,w:360,h:100,f:22},{name:"ChooseHowMany_WP",x:700,y:760,w:620,h:100,f:22},{name:"OnJokerAction_WP",x:850,y:760,w:300,h:70,f:20},
    {name:"FirstJokerAction_WP",x:800,y:720,w:400,h:160,f:20},
    {name:"P0timer",x:872,y:1050,w:260,h:8},{name:"P1timer",x:156,y:462,w:8,h:260},{name:"P2timer",x:872,y:144,w:260,h:8},{name:"P3timer",x:1834,y:462,w:8,h:260},
    {name:"players_name",x:54,y:30,w:500,h:20,f:14},{name:"paper_WP",x:30,y:50,w:500,f:18},
    {name:"RobotPlay",x:850,y:1070,w:214,h:80,f:28},{name:"jokercall1",x:900,y:330,w:200,h:40,f:18},{name:"jokercall2",x:900,y:380,w:200,h:40,f:18},{name:"LastGoted",x:940,y:380,w:100,h:40,f:18},
    {name:"LastGoted",x:1880,y:990,w:80,h:110},{name:"LastGot_WP",x:1680,y:930,w:190,h:170},{name:"Win_WP",x:588,y:420,w:830,h:360},
    {name:"WIN0",x:680,y:500,w:130,h:130},{name:"WIN1",x:870,y:500,w:130,h:130},{name:"WIN2",x:1060,y:530,w:100,h:100},{name:"WIN3",x:1220,y:530,w:100,h:100},
    {name:"winnumbg0",x:685,y:565,w:128,h:70,f:40},{name:"winnumbg1",x:875,y:565,w:128,h:70,f:40},{name:"winnumbg2",x:1063,y:581,w:101,h:53,f:30},{name:"winnumbg3",x:1224,y:581,w:101,h:53,f:30},
    {name:"P0WIN",x:684,y:650,w:130,h:70,f:25},{name:"P1WIN",x:874,y:650,w:130,h:70,f:25},{name:"P2WIN",x:1064,y:650,w:100,h:70,f:25},{name:"P3WIN",x:1223,y:650,w:100,h:70,f:25},
    {name:"Game_info",x:1336,y:1145,w:644,h:70,f:18},{name:"wrn1",x:76,y:380,w:50,h:50},{name:"wrn2",x:1165,y:68,w:50,h:50},{name:"wrn3",x:1876,y:380,w:50,h:50},{name:"FullPaperBTN",x:628,y:100,w:200,h:30,f:20},
    {name:"adminPaper",x:800,y:350,w:390,f:15},{name:"closeover_btn",x:1294,y:440,w:104,h:34},{name:"stoptableBTN",x:620,y:50,w:200,h:30,f:20},{name:"stoptable_wp",x:750,y:500,w:500,f:18},
    {name:"wrn1_popup",x:100,y:400,w:160,f:16},{name:"wrn2_popup",x:1190,y:95,w:160,f:16},{name:"wrn3_popup",x:1728,y:400,w:160,f:16},
    {name:"terminate",x:730,y:440,w:560,f:22},{name:"settings_wp",x:902,y:12,w:800,f:20},

];
var undercardsver = 'undercards_2_2';
var undercardshor = 'undercards_1_2';
$(document).ready(function() {
    //get frame sizes
    setsettings();
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    initsize(width, height);
});

function winresize(){
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    initsize(width, height);
    CorrectThrownCard();
}

function initsize(width, height){
    var Table_Width = parseInt(height * 5 / 3); // whole board width
    var Table_Height = parseInt(width * 3 / 5);  //whole board height
    if (height - 10 < Table_Height){
        Table_Height = height - 20; //resized board height
        Table_Width = parseInt(Table_Height * 5 / 3);  //resized board width
    }
    if (width - 10 < Table_Width){
        Table_Width = width - 20; //resized board width
        Table_Height = parseInt(Table_Width * 3 / 5); //resized board height
    }
    var Table_X = (width - Table_Width) / 2; //Table_X = start of board coordinate from left
    var Table_Y = (height - Table_Height) / 2;  //Table_Y = start of board coordinate from top
    // Init_size_object(Table_Width, Table_Height, Table_X, Table_Y);
    tablesizechange(Table_Width, Table_Height, Table_X, Table_Y);
    processresize(Table_Width, Table_Height, Table_X, Table_Y);
}

//change whole table size and coordinate
function tablesizechange(W,H,X,Y){
    document.getElementById('table').style.backgroundSize = W+"px "+H+"px";
    $('#table').width(W);
    $('#table').height(H);
    document.getElementById('table').style.marginLeft = X+"px";
    document.getElementById('table').style.marginTop = Y+"px";
}

function processresize(W,H,X,Y){
    stopTimer();
    for (var i = 0; i < allObjects.length; i++) {
        var Obj = document.getElementById(allObjects[i].name);
        var Obj_X = parseInt(X + (W * allObjects[i].x / 2000));
        var Obj_Y = parseInt(Y + (H * allObjects[i].y / 1200));
        var Obj_Font = parseInt(W * allObjects[i].f / 2000);
        var Obj_W = parseInt(W * allObjects[i].w / 2000);
        var Obj_H = parseInt(H * allObjects[i].h / 1200);
        Obj.style.backgroundSize = Obj_W+"px "+Obj_H+"px";
        Obj.style.width = Obj_W+"px";
        Obj.style.height = Obj_H+"px";
        Obj.style.top = Obj_Y+"px";
        Obj.style.left = Obj_X+"px";
        Obj.style.fontSize = Obj_Font+"px";
    }
    defaultsize = parseInt(document.getElementById('P0timer').style.width);
    log('defaultsize '+defaultsize);
    var endTime = new Date().getTime();
    oldTime = oldTime - (endTime - startTime);
    SetTimer(oldplayerTimer, oldTime, oldtotlatime);
}


function stopTimer(){
    //clearTimeout(mytimer);
    $( "#P0timer" ).stop(true,true);
    $( "#P1timer" ).stop(true,true);
    $( "#P2timer" ).stop(true,true);
    $( "#P3timer" ).stop(true,true);
}

function resumeTimer(){
//    $( "#P0timer" ).resume();
//    $( "#P1timer" ).resume();
//    $( "#P2timer" ).resume();
//    $( "#P3timer" ).resume();
}

function CorrectThrownCard() {
    for (var i=0; i<=3; i++){
        var width = document.getElementById('player'+i+'_thrown_card').style.width;
        var height = document.getElementById('player'+i+'_thrown_card').style.height;
        var left = document.getElementById('player'+i+'_thrown_card').style.left;
        var top = document.getElementById('player'+i+'_thrown_card').style.top;
        document.getElementById('P'+i+'ThrownCardAnimate').style.width = width;
        document.getElementById('P'+i+'ThrownCardAnimate').style.height = height;
        document.getElementById('P'+i+'ThrownCardAnimate').style.backgroundSize = width+" "+height;
        document.getElementById('P'+i+'ThrownCardAnimate').style.left = left;
        document.getElementById('P'+i+'ThrownCardAnimate').style.top = top;
    }
}


function maxWindow() {
    window.moveTo(0, 0);
    alert('ok');
    if (document.all) {
        top.window.resizeTo(screen.availWidth, screen.availHeight);
    }

    else if (document.layers || document.getElementById) {
        if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
            top.window.outerHeight = screen.availHeight;
            top.window.outerWidth = screen.availWidth;
        }
    }
}


function ShowThisTable(ThisRow, Stage, Round){
    var style_WP = 'style=""'; var style = ['style=""','style=""','style=""','style=""'];
    if (fullstat === true){
        if (ThisRow[0].length > 1){
            ThisRow[0] = parseInt(ThisRow[0]);
            style_WP = 'style="background: -webkit-linear-gradient(#3d6c50, #18492d); -o-linear-gradient(#3d6c50, #18492d); -moz-linear-gradient(#3d6c50, #18492d); linear-gradient(#3d6c50, #18492d);"';
            curretround = true;
        }
        for (var i=1; i<9; i+=2){
            if (ThisRow[i] == '-1'){
                ThisRow[i] = '';
                ThisRow[i+1] = '';
            } else {
                if (parseInt(ThisRow[i+1]) < -10){
                    ThisRow[i+1] = '|——|';
                } else {
                    if (ThisRow[i+1].substr(ThisRow[i+1].length - 1) == '-'){
                        ThisRow[i+1] = parseInt(ThisRow[i+1]);
                        style[(i+1)/2] = 'style="text-decoration:line-through;"';
                    }
                    if (ThisRow[i+1].substr(ThisRow[i+1].length - 1) == '+'){
                        ThisRow[i+1] = parseInt(ThisRow[i+1]);
                        style[(i+1)/2] = 'style="color: #FFC000;"';
                    }
                    if (parseInt(ThisRow[i+1]) == '0'){
                        ThisRow[i+1] = '';
                    }
                }
            }
        }
        PaperList = '<div id="p'+Stage+'d'+Round+'_WP" '+style_WP+' class="stage_WP">';
        PaperList += '<div class="round_CNT" id="N'+Stage+''+Round+'">'+ThisRow[0]+'</div>';
        PaperList += '<div class="score_mid" '+style[1]+' id="P1p'+Stage+'d'+Round+'">'+ThisRow[1]+' - '+ThisRow[2]+'</div>';
        PaperList += '<div class="score_mid" '+style[2]+' id="P2p'+Stage+'d'+Round+'">'+ThisRow[3]+' - '+ThisRow[4]+'</div>';
        PaperList += '<div class="score_mid" '+style[3]+' id="P3p'+Stage+'d'+Round+'">'+ThisRow[5]+' - '+ThisRow[6]+'</div>';
        PaperList += '<div class="score_right" '+style[4]+' id="P4p'+Stage+'d'+Round+'">'+ThisRow[7]+' - '+ThisRow[8]+'</div>';
        PaperList += '</div>';
        $('#paper_WP').append(PaperList);
        if (fullpaper == ''){
            $('#adminPaper').append(PaperList);
        }
    } else {
        for (var i=1; i<9; i+=2){
            if (ThisRow[i] == '-1'){
                ThisRow[i] = '';
                ThisRow[i+1] = '';
            } else {
                if (ThisRow[i+1].substr(ThisRow[i+1].length - 1) == '-'){
                    ThisRow[i+1] = parseInt(ThisRow[i+1]);
                    style[(i+1)/2] = 'style="text-decoration:line-through;"';
                }
                if (ThisRow[i+1].substr(ThisRow[i+1].length - 1) == '+'){
                    ThisRow[i+1] = parseInt(ThisRow[i+1]);
                    style[(i+1)/2] = 'style="color: #FFC000;"';
                }


                if (parseInt(ThisRow[i+1]) == '0'){
                    ThisRow[i+1] = '';
                }
            }
        }
        if (ThisRow[0].length < 2){
            PaperList = '<div id="p'+Stage+'d'+Round+'_WP" '+style_WP+' class="stage_WP">';
            PaperList += '<div class="round_CNT" id="N'+Stage+''+Round+'">'+ThisRow[0]+'</div>';
            PaperList += '<div class="score_mid" '+style[1]+' id="P1p'+Stage+'d'+Round+'">'+ThisRow[1]+' - '+ThisRow[2]+'</div>';
            PaperList += '<div class="score_mid" '+style[2]+' id="P2p'+Stage+'d'+Round+'">'+ThisRow[3]+' - '+ThisRow[4]+'</div>';
            PaperList += '<div class="score_mid" '+style[3]+' id="P3p'+Stage+'d'+Round+'">'+ThisRow[5]+' - '+ThisRow[6]+'</div>';
            PaperList += '<div class="score_right" '+style[4]+' id="P4p'+Stage+'d'+Round+'">'+ThisRow[7]+' - '+ThisRow[8]+'</div>';
            PaperList += '</div>';
        } else {
            ThisRow[0] = parseInt(ThisRow[0]);
            style_WP = 'style="background: -webkit-linear-gradient(#3d6c50, #18492d);"';
            curretround = true;
            PaperList += '<div id="p'+Stage+'d'+Round+'_WP" '+style_WP+' class="stage_WP" style="background: -webkit-linear-gradient(#3d6c50, #18492d);">';
            PaperList += '<div class="round_CNT" id="N'+Stage+''+Round+'">'+ThisRow[0]+'</div>';
            PaperList += '<div class="score_mid" '+style[1]+' id="P1p'+Stage+'d'+Round+'">'+ThisRow[1]+' - '+ThisRow[2]+'</div>';
            PaperList += '<div class="score_mid" '+style[2]+' id="P2p'+Stage+'d'+Round+'">'+ThisRow[3]+' - '+ThisRow[4]+'</div>';
            PaperList += '<div class="score_mid" '+style[3]+' id="P3p'+Stage+'d'+Round+'">'+ThisRow[5]+' - '+ThisRow[6]+'</div>';
            PaperList += '<div class="score_right" '+style[4]+' id="P4p'+Stage+'d'+Round+'">'+ThisRow[7]+' - '+ThisRow[8]+'</div>';
            PaperList += '</div>';
            $('#paper_WP').append(PaperList);
            if (fullpaper == ''){
                log('PaperList: '+PaperList);
                $('#adminPaper').append(PaperList);
            }
        }
    }
}

function getfullpaper() {
    fullstat = true;
    sendlog('25,1');
}

function getsmallpaper() {
    fullstat = false;
    sendlog('25,0');
}


$( document ).ready(function() {
    $('#paper_WP').mouseover(function (){
        if (fullstat === false && allow_paper_show === true){
            getfullpaper();
        }
    });
    $('body').click(function (){
        if (allow_paper_show === true && fullstat === true){
            getsmallpaper();
        }
    });
});


function changebg(bg, obj){
    document.getElementsByClassName('option')[0].style.border = '2px solid #CCCCCC';
    document.getElementsByClassName('option')[1].style.border = '2px solid #CCCCCC';
    document.getElementsByClassName('option')[2].style.border = '2px solid #CCCCCC';
    document.getElementsByClassName('option')[3].style.border = '2px solid #CCCCCC';
    document.getElementsByClassName('option')[4].style.border = '2px solid #CCCCCC';
    obj.style.border = '2px solid #e74c3c';
    $('body').css("background-image", "url(img/background"+bg+".png)");
    savesetting(6, bg);
}

function changetablebg(bg, obj){
    document.getElementsByClassName('option')[5].style.border = '2px solid #CCCCCC';
    document.getElementsByClassName('option')[6].style.border = '2px solid #CCCCCC';
    document.getElementsByClassName('option')[7].style.border = '2px solid #CCCCCC';
    document.getElementsByClassName('option')[8].style.border = '2px solid #CCCCCC';
    document.getElementsByClassName('option')[9].style.border = '2px solid #CCCCCC';
    obj.style.border = '2px solid #e74c3c';
    $('#table').css("background-image", "url(img/tablebg"+bg+".png)");
    savesetting(7, bg);
}

function changecardbg(bg){
    $('.undercards_2').css("background-image", "url(img/cards/under"+bg+".png)");
    $('.lastcard').css("background-image", "url(img/cards/under"+bg+".png)");
    $('#LastGoted').css("background-image", "url(img/cards/under"+bg+".png)");
    $('.undercards_3').css("background-image", "url(img/cards/rotateunder"+bg+".png)");
    $('.undercards_1').css("background-image", "url(img/cards/rotateunder"+bg+".png)");
    savesetting(8, bg);
}

function savesetting(option, preference){
    switch (option){
        case 6:
            localStorage.setItem("bg", preference);
            break;
        case 7:
            localStorage.setItem("table", preference);
            break;
        case 8:
            localStorage.setItem('cards', preference);
    }
    setsettings();
}

function setsettings(){
    if (localStorage.bg){
        document.getElementsByClassName('option')[0].style.border = '2px solid #CCCCCC';
        document.getElementsByClassName('option')[1].style.border = '2px solid #CCCCCC';
        document.getElementsByClassName('option')[2].style.border = '2px solid #CCCCCC';
        document.getElementsByClassName('option')[3].style.border = '2px solid #CCCCCC';
        document.getElementsByClassName('option')[4].style.border = '2px solid #CCCCCC';
        document.getElementsByClassName('option')[4].style.border = '2px solid #e74c3c';
        $('body').css("background-image", "url(img/background"+localStorage.bg+".png)");
    } else {
        $('body').css("background-image", "url(img/background0.png)");
    }
    if (localStorage.table){
        $('#table').css("background-image", "url(img/tablebg"+localStorage.table+".png)");
    } else {
        $('#table').css("background-image", "url(img/tablebg.png)");
    }
    if (localStorage.cards > -1){
        $('.undercards_2').css("background-image", "url(img/cards/under"+localStorage.cards+".png)");
        $('.lastcard').css("background-image", "url(img/cards/under"+localStorage.cards+".png)");
        $('#LastGoted').css("background-image", "url(img/cards/under"+localStorage.cards+".png)");
        $('.undercards_3').css("background-image", "url(img/cards/rotateunder"+localStorage.cards+".png)");
        $('.undercards_1').css("background-image", "url(img/cards/rotateunder"+localStorage.cards+".png)");
        undercardshor = 'undercards_1_'+localStorage.cards;
        undercardsver = 'undercards_2_'+localStorage.cards;
    } else {
        $('.undercards_2').css("background-image", "url(img/cards/under2.png)");
        $('.lastcard').css("background-image", "url(img/cards/under2.png)");
        $('#LastGoted').css("background-image", "url(img/cards/under2.png)");
        $('.undercards_3').css("background-image", "url(img/cards/rotateunder2.png)");
        $('.undercards_1').css("background-image", "url(img/cards/rotateunder2.png)");
    }

}

function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}