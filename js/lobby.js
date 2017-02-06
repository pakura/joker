var index = 1;
var stakes = index++;
var delays = index++;
var jokerTypes = index++;
var penaltyTypes = index++;
var penalty8 = index++;
var penalty9 = index++;
var areYouInQueue = index++;
var userId = index++;
var userHex = index++;
var balance = index++;
var ActionTable = index++;
var amounts = [];
var games = [];
var timers = [];
var penalties = [];
var penalties9 = [];
var oldpenalties9 = [];
var penalties1 = [];
var oldpenalties1 = [];
var websocket;
var sessionData = '';
var msg = [];
var User_ID = 0;
var fullgame = false;
var initial = false;
var curMsg = '';

var avatar = 'img/noavatar.jpg';
var Def = 0;
var pinginterval; var Conn;
function connect(){
    if (websocket){
        if (websocket.readyState == WebSocket.OPEN || websocket.readyState == WebSocket.CONNECTING){
            websocket.close();
        }
    }
    //websocket = new WebSocket("ws://192.168.1.48:8080");
    //websocket = new WebSocket("ws://185.68.9.98:8080");
    websocket = new WebSocket("ws://185.68.9.98:8080/joker");
    websocket.onerror = onerror_g;
    websocket.onopen = onopen_g;
    websocket.onmessage = onmessage_g;
}

function onerror_g(evt){
    Conn = setTimeout(reconnect, 2000);
    log("Connection error");
}

function onopen_g(evt){
    websocket.send(sessionData);
    log(sessionData);
} //init first message

function onmessage_g(evt){
    clearInterval(Conn);
    clearInterval(pinginterval);
    Ping = new Date().getTime();
    pinginterval = setInterval(function(){sendping()}, 3000);
    log(evt.data);
    curMsg += evt.data;
    if( curMsg.indexOf('@') === -1 ) return;

    var Data = curMsg.split('@');
    curMsg = Data[ Data.length - 1 ];

    msg = [];
    for (var i=0; i<Data.length-1; i++){
        msg = Data[i].split(',');
        init(msg);
    }

} //message event

function log(str){
    console.log(str);
}

function sendlog(str){
    websocket.send(str+'\u0000');
}

function login_player(){
    if (document.getElementById("Player_ID").value !== ""){
        User_ID = document.getElementById("Player_ID").value;
        sessionData='11,6,1,'+User_ID+',ses,0\u0000';
        connect();
    }
} //login player

function logout(){
    sendlog('12');
}

function init(argument) {
    if (argument[0] == '102'){
        for (var i = 1; i<7; i++){
            AddThisOption(argument[i].split(';'), i);
        }
        Def = '1'+argument[areYouInQueue];
        EditButton();
        if (typeof argument[ActionTable] != 'undefined'){
            ShowActiveTable(argument[ActionTable]);
        }
        ShowUserInfo(argument[userHex], argument[balance]);
        resize();
        if (initial === false){
            sendavatar();
        }
        initial = true;
    }
    if (argument[0] == '159'){
        StartGame(User_ID, argument[1]);
    }
    if (argument[0] == '101'){
        if (argument[1] != '0') {
            argument[1]++;
            Def = argument[1];
            EditButton();
            showerrormessage(argument[1]);
        }
    }
} //init all function

function sendavatar(){
    sendlog('29,'+btoa(avatar));
}

function showerrormessage(arg){
    arg = parseInt(arg);
    switch (arg){
        case 1:
            $('error_text').html('PARSER ERROR');
            break;
        case 2:
            $('error_text').html('DB ERROR');
            break;
        case 3:
            $('error_text').html('SYSTEM ERROR');
            break;
        case 4:
            $('error_text').html('UNKNOWN ACTION');
            break;
        case 5:
            $('error_text').html('UNAUTHORIZED');
            break;
        case 6:
            $('error_text').html('UNHANDLED ACTION');
            break;
        case 11:
            $('error_text').html('სესია არასწორია.');
            break;
        case 13:
            $('error_text').html('მომხმარებელი არ არსებობს.');
            break;
        case 14:
            $('error_text').html('თქვენ არ ხარ ავტორიზებული.');
            break;
        case 15:
            $('error_text').html('არ გაქვთ საკმარისი თანხა.');
            break;
        case 17:
            $('error_text').html('ანგარიში დაკავშირებულია რამოდენიმეჯერ.');
            break;
        default :
            $('error_text').html('');
            break;
    }
}

function AddThisOption(argument, section) {
    section = parseInt(section);
    switch (section){
        case 1:
            AmountBuilder(argument);
            break;
        case 2:
            TimerBuilder(argument);
            break;
        case 3:
            GameTypeBuilder(argument);
            break;
        case 4:
            PenaltyBuilder(argument);
            break;
        case 5:
            Penalty1Builder(argument);
            break;
        case 6:
            Penalty9Builder(argument);
            break;
        default:
            break;
    }
} // call appropriate preference function

function AmountBuilder(data){
    var div = '';
    amounts = [];
    div += '<div class="Filter_Title">თანხა: </div>\
			<div class="mid_filer"></div>';
    for (var i = 0; i<data.length; i++){
        if (data[i].charAt(data[i].length - 1) != '-'){
            amounts.push(parseInt(data[i]));
            div += '<div class="Option_Label">'+parseInt(data[i]) / 100+'<span class="lari">L</span></div>\
				<div class="checkbox1" id="amount_'+parseInt(data[i])+'" onclick="AmountChange('+parseInt(data[i])+')"></div>';
        } else {
            div += '<div class="Option_Label">'+parseInt(data[i]) / 100+'<span class="lari">L</span></div>\
				<div class="checkbox" id="amount_'+parseInt(data[i])+'" onclick="AmountChange('+parseInt(data[i])+')"></div>';
        }

        if (i + 1 != data.length){
            div += '<div class="mid_filer"></div>';
        }
    }
    document.getElementById('Amount_Filter_WP').innerHTML = '';
    $('#Amount_Filter_WP').append(div);
    resize();
} //write amount option

function TimerBuilder(data){
    var div = '';
    timers = [];
    div += '<div class="Filter_Title">დრო: </div>\
			<div class="mid_filer"></div>';
    for (var i = 0; i<data.length; i++){
        if (data[i].charAt(data[i].length - 1) != '-'){
            timers.push(parseInt(data[i]));
            div += '<div class="Option_Label">'+parseInt(data[i])+' წამი</div>\
				<div class="checkbox1" id="timer_'+parseInt(data[i])+'" onclick="TimerChange('+parseInt(data[i])+')"></div>';
        } else {
            div += '<div class="Option_Label">'+parseInt(data[i])+' წამი</div>\
				<div class="checkbox" id="timer_'+parseInt(data[i])+'" onclick="TimerChange('+parseInt(data[i])+')"></div>';
        }
        if (i + 1 != data.length){
            div += '<div class="mid_filer"></div>';
        }
    }
    document.getElementById('Time_Filter_WP').innerHTML = '';
    $('#Time_Filter_WP').append(div);
    resize();
} //write timer option

function GameTypeBuilder(data){
    var div = '';
    games = [];
    div += '<div class="Filter_Title">თამაშის ტიპი: </div>\
			<div class="mid_filer"></div>';
    for (var i = 0; i<data.length; i++){
        if (data[i].charAt(data[i].length - 1) != '-'){
            if (i == 0){
                fullgame = true;
            }
            games.push(parseInt(data[i]));
            div += '<div class="Option_Label">'+GameTypeToText(parseInt(data[i]))+'</div>\
						<div class="checkbox1" id="game_'+parseInt(data[i])+'" onclick="GameChange('+parseInt(data[i])+')"></div>';
        } else {
            if (i == 0){
                fullgame = false;
            }
            div += '<div class="Option_Label">'+GameTypeToText(parseInt(data[i]))+'</div>\
						<div class="checkbox" id="game_'+parseInt(data[i])+'" onclick="GameChange('+parseInt(data[i])+')"></div>';
        }
        if (i + 1 != data.length){
            div += '<div class="mid_filer"></div>';
        }
    }
    document.getElementById('GameType_Filter_WP').innerHTML = '';
    $('#GameType_Filter_WP').append(div);
    resize();
} //write game type option

function GameTypeToText(num){
    switch (num){
        case 1:
            num = 'სრული';
            break;
        case 2:
            num = 'ცხრიანები (4)';
            break;
        case 3:
            num = 'ცხრიანები (3)';
            break;
        case 4:
            num = 'ცხრიანები (2)';
            break;
        case 5:
            num = 'ცხრიანები (1)';
            break;
    }
    return num;
} //game type to text

function PenaltyBuilder(data){
    var div = '';
    penalties = [];
    div += '<div class="Filter_Title">ხიშტის ტიპი: </div>\
			<div class="mid_filer"></div>';
    for (var i = 0; i<data.length; i++){
        if (data[i].charAt(data[i].length - 1) != '-'){
            penalties.push(parseInt(data[i]));
            if (parseInt(data[i]) == 1) var penalty = 'ჩვეულებრივი'; else var penalty = 'სპეცი';
            div += '<div class="Option_Label">'+penalty+'</div>\
						<div class="checkbox1" id="penalty_'+parseInt(data[i])+'" onclick="PenaltyChange('+parseInt(data[i])+')"></div>';
        } else {
            if (parseInt(data[i]) == 1) var penalty = 'ჩვეულებრივი'; else var penalty = 'სპეცი';
            div += '<div class="Option_Label">'+penalty+'</div>\
						<div class="checkbox" id="penalty_'+parseInt(data[i])+'" onclick="PenaltyChange('+parseInt(data[i])+')"></div>';
        }
        if (i + 1 != data.length){
            div += '<div class="mid_filer"></div>';
        }
    }
    document.getElementById('PenaltyType_Filter_WP').innerHTML = '';
    $('#PenaltyType_Filter_WP').append(div);
    resize();
} //write penalty type option

function Penalty9Builder(data){
    var div = '';
    penalties9 = [];
    div += '<div class="Filter_Title">ხიშტი ცხრიანებში: </div>\
			<div class="mid_filer"></div>';
    if (data.indexOf('0') != -1 || data.indexOf('0-') != -1){
        data.splice(data.indexOf('0'), 1);
    }
    for (var i = 0; i<data.length; i++){
        if (data[i].charAt(data[i].length - 1) != '-') {
            penalties9.push(parseInt(data[i]));
            div += '<div class="Option_Label">' + parseInt(data[i]) + '</div>\
                        <div class="checkbox1" id="penalty9_' + parseInt(data[i]) + '" onclick="Penalty9Change(' + parseInt(data[i]) + ')"></div>';
        } else {
            div += '<div class="Option_Label">' + parseInt(data[i]) + '</div>\
                        <div class="checkbox" id="penalty9_' + parseInt(data[i]) + '" onclick="Penalty9Change(' + parseInt(data[i]) + ')"></div>';
        }
        if (i + 1 != data.length){
            div += '<div class="mid_filer"></div>';
        }
    }
    if (fullgame === false){
        $('#penalty1').fadeOut('fast');
        hidepenlaty1();
    }
    document.getElementById('Penalty9_Filter_WP').innerHTML = '';
    $('#Penalty9_Filter_WP').append(div);
    resize();
    oldpenalties9 = penalties9;
} //write penalty value for 9

function Penalty1Builder(data){
    var div = '';
    penalties1 = [];
    div += '<div class="Filter_Title">ხიშტი ერთიანებში: </div>\
			<div class="mid_filer"></div>';
    //რაც აქ წერია მხოლოდ მე და ღმერთებმა ვიცით
    var inactive = false;
    for (var i = 0; i<data.length - 2; i++){
        if (data[i].charAt(data[i].length - 1) != '-') {
            inactive = true;
        }
    }
    if (inactive === false){
        data[0] = parseInt(data[0]).toString();
    }
    for (var i = 0; i<data.length -1; i++){
        if (data[i].charAt(data[i].length - 1) != '-') {
            penalties1.push(parseInt(data[i]));
            div += '<div class="Option_Label">' + parseInt(data[i]) + '</div>\
                        <div class="checkbox1" id="penalty1_' + parseInt(data[i]) + '" onclick="Penalty1Change(' + parseInt(data[i]) + ')"></div>';
        } else {
            div += '<div class="Option_Label">' + parseInt(data[i]) + '</div>\
                        <div class="checkbox" id="penalty1_' + parseInt(data[i]) + '" onclick="Penalty1Change(' + parseInt(data[i]) + ')"></div>';
        }
        if (i + 2 != data.length){
            div += '<div class="mid_filer"></div>';
        }
    }
    document.getElementById('Penalty1_Filter_WP').innerHTML = '';
    $('#Penalty1_Filter_WP').append(div);
    resize();
    oldpenalties1 = penalties1;
} //write penalty value for 1-8

function AmountChange(amount){
    if (amounts.indexOf(amount) != -1){
        if (amounts.length > 1){
            amounts.splice(amounts.indexOf(amount), 1);
            document.getElementById('amount_'+amount).className = "checkbox";
        }
    } else {
        amounts.push(amount);
        document.getElementById('amount_'+amount).className = "checkbox1";
    }
} //change amount option

function GameChange(game){
    if (games.indexOf(game) != -1){
        if (games.length > 1){
            games.splice(games.indexOf(game), 1);
            document.getElementById('game_'+game).className = "checkbox";
        }
    } else {
        games.push(game);
        document.getElementById('game_'+game).className = "checkbox1";
    }
    EditOption();
} //change game type option

function TimerChange(time){
    if (timers.indexOf(time) != -1){
        if (timers.length > 1){
            timers.splice(timers.indexOf(time), 1);
            document.getElementById('timer_'+time).className = "checkbox";
        }
    } else {
        timers.push(time);
        document.getElementById('timer_'+time).className = "checkbox1";
    }
} //chage timer option

function PenaltyChange(penalty){
    if (penalties.indexOf(penalty) != -1){
        if (penalties.length > 1){
            penalties.splice(penalties.indexOf(penalty), 1);
            document.getElementById('penalty_'+penalty).className = "checkbox";
        }
    } else {
        penalties.push(penalty);
        document.getElementById('penalty_'+penalty).className = "checkbox1";
    }
    EditOption();
} //change penalty type option

function Penalty9Change(penalty){
    if (penalties9.indexOf(penalty) != -1){
        if (penalties9.length > 1){
            penalties9.splice(penalties9.indexOf(penalty), 1);
            document.getElementById('penalty9_'+penalty).className = "checkbox";
        }
    } else {
        penalties9.push(penalty);
        document.getElementById('penalty9_'+penalty).className = "checkbox1";
    }
    oldpenalties9 = penalties9;
} //change penalty option for 9

function Penalty1Change(penalty){
    if (penalties1.indexOf(penalty) != -1){
        if (penalties1.length > 1){
            penalties1.splice(penalties1.indexOf(penalty), 1);
            document.getElementById('penalty1_'+penalty).className = "checkbox";
        }
    } else {
        penalties1.push(penalty);
        document.getElementById('penalty1_'+penalty).className = "checkbox1";
    }
    oldpenalties1 = penalties1;
} //change penalty option for 1-8

function EditOption(){
    if (games.indexOf(1) == -1){
        $('#penalty1').fadeOut('fast');
        hidepenlaty1();
        penalties1 = [0];
    } else {
        $('#penalty1').fadeIn('fast');
        showpenlaty1();
        penalties1 = oldpenalties1;
    }
    if (penalties.indexOf(1) == -1){
        $('#penalty1').fadeOut('fast');
        $('#penalty9').fadeOut('fast');
        hidepenlaty1();
        hidepenlaty9();
        penalties1 = [0];
        penalties9 = [0];
    } else {
        if (games.indexOf(1) != -1){
            $('#penalty1').fadeIn('fast');
            showpenlaty1();
            penalties1 = oldpenalties1;
        }
        $('#penalty9').fadeIn('fast');
        showpenalty9();
        penalties9 = oldpenalties9;
    }
} //show n hide penalty 9, 1-8 option

function SendOption(){
    var send = '26,'+EditLog(amounts)+','+EditLog(timers)+','+EditLog(games)+','+EditLog(penalties);
    if (EditLog(penalties1) != ''){
        send += ','+EditLog(penalties1);
    } else {
        send += ',0';
    }
    if (EditLog(penalties9) != ''){
        send += ','+EditLog(penalties9);
    } else {
        send += ',0';
    }
    console.log(send);
    sendlog(send);
} //send all option

function EditLog(str){
    var send = '';
    for (var i = 0; i<str.length; i++){
        if (i + 1 != str.length){
            send += str[i]+';';
        } else {
            send += str[i];
        }
    }
    return send;
} //write option for send function

function StartGame(user, id){
    var url = 'joker.php?user='+user+'&id='+id;
    var width =  parseInt(document.body.clientWidth) - 10;
    var height =  parseInt(document.body.clientHeight) - 10;
    //javascript:popupwnd(url,'no','no','no','no','no','no','','', width, height);
//    window.open(url, "_blank");
    window.open(url,"_self");
//    var win = window.open(url, '_blank');
//    win.focus();
} //start game n open popup

function EditButton(){
    Def = parseInt(Def);
    switch (Def){
        case 10:
            buttonaction('10');
            break;
        case 11:
            buttonaction('11');
            break;
        default :
            buttonaction(Def);
            break;
    }

} //change play btn action


function ActionButton() {
    return '';
}

function leavequeue(){
    amounts = [];
    timers = [];
    games = [];
    penalties = [];
    penalties1 = [];
    penalties9 = [];
    oldpenalties1 = [];
    oldpenalties9 = [];
    sendlog('27');
} //leave lobby queue

function Continue(id){
    var url = 'joker.php?user='+User_ID+'&id='+id;
    var width =  parseInt(document.body.clientWidth) - 10;
    var height =  parseInt(document.body.clientHeight) - 10;
    window.open(url,"_self");
} //Continue game on active table click

function ShowActiveTable(tables){
    if (tables == ''){
        document.getElementById('ActionTable').innerHTML = '<div class="ActionTableText"></div>';
        return;
    }
    var maintablearray = tables.split('*');
    document.getElementById('ActionTable').innerHTML = '<div class="ActionTableText"></div>';
    if (maintablearray[0] != ''){
        document.getElementById('ActionTable').innerHTML = '<div class="ActionTableText">აქტიური მაგიდები: </div>';
        for (var i = 0; i<maintablearray.length; i++){
            var subtablearray = maintablearray[i].split(';');
            if (subtablearray[3] == '2'){
                var div = '<div class="ActionTableBTN" id="ActionTable'+subtablearray[0]+'" title="მაგიდის ID: '+subtablearray[0]+', ფსონი: '+parseInt(subtablearray[1]) / 100+'ლარი, თამაშის ტიპი: '+gametype2text(subtablearray[2])+', ხიშტი: '+penalty2text(subtablearray[3])+'" onclick="Continue('+subtablearray[0]+')"></div>';
            } else {
                if (subtablearray[4] != '0'){
                    var div = '<div class="ActionTableBTN" id="ActionTable'+subtablearray[0]+'" title="მაგიდის ID: '+subtablearray[0]+', ფსონი: '+parseInt(subtablearray[1]) / 100+'ლარი, თამაშის ტიპი: '+gametype2text(subtablearray[2])+',ხიშტი ცხრიანებში: '+subtablearray[5]+', ხიშტი რვიანებში: '+subtablearray[4]+'" onclick="Continue('+subtablearray[0]+')"></div>';
                } else {
                    var div = '<div class="ActionTableBTN" id="ActionTable'+subtablearray[0]+'" title="მაგიდის ID: '+subtablearray[0]+', ფსონი: '+parseInt(subtablearray[1]) / 100+'ლარი, თამაშის ტიპი: '+gametype2text(subtablearray[2])+',ხიშტი ცხრიანებში: '+subtablearray[5]+'" onclick="Continue('+subtablearray[0]+')"></div>';
                }
            }

            $('#ActionTable').append(div);
        }
        resize();
    }
} //write active tables

function ShowUserInfo(hexname, balance){
    document.getElementsByClassName('UserName_WP')[0].innerHTML = hex2asc(hexname).toUpperCase();
    document.getElementById('balance').innerHTML = (parseInt(balance) / 100).toFixed(2)+ '<span style="font-family: Lari; font-size: 22px; margin-left:2px;">L</span>';
} //show user info, balance n username

function hex2asc(hexx) {
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
} //hexx to text for username

function gametype2text(type){
    switch (type){
        case '1':
            type = 'სრული';
            break;
        case '2':
            type = 'ცხრიანები (4)';
            break;
        case '3':
            type = 'ცხრიანები (3)';
            break;
        case '4':
            type = 'ცხრიანები (2)';
            break;
        case '5':
            type = 'ცხრიანები (1)';
            break;
    }
    return type;
}

function penalty2text(type){
    if (type == '1'){
        return 'ჩვეულებრივი';
    } else {
        return 'სპეცი';
    }
}

function linesposition(){
    line1 = $('#amount').position();
    line1.left = parseInt($('#lines_WP').position().left);
    line1.width = parseInt($('#lines_WP').width()) + 8;
    line1.height = parseInt($('#corectbtn').position().top + ($('#corectbtn').height() / 2) - line1.top + line1.top - $('#lines_WP').position().top - 20) ;
    line1.top = parseInt(line1.top - $('#lines_WP').position().top + 27);

    line2 = $('#game').position();
    line2.left = parseInt($('#lines_WP').position().left);
    line2.width =  parseInt($('#lines_WP').width()) +7;
    line2.height = parseInt($('#corectbtn').position().top + ($('#corectbtn').height() / 2) - line2.top + line2.top - $('#lines_WP').position().top ) ;
    line2.top = parseInt(line2.top - $('#lines_WP').position().top + 28);

    line3 = $('#time').position();
    line3.left = parseInt($('#lines_WP').position().left);
    line3.width =  parseInt($('#lines_WP').width() + 8);
    line3.height = parseInt($('#corectbtn').position().top + ($('#corectbtn').height() / 2) - line3.top + line3.top - $('#lines_WP').position().top + 20) ;
    line3.top = parseInt(line3.top - $('#lines_WP').position().top + 28);

    line4 = $('#penalty').position();
    line4.left = parseInt($('#lines_WP').position().left);
    line4.width =  parseInt($('#lines_WP').width() + 8);
    line4.height = parseInt($('#corectbtn').position().top + ($('#corectbtn').height() / 2) - line4.top + line4.top - $('#lines_WP').position().top - 30) ;
    line4.top = parseInt(line4.top - $('#lines_WP').position().top + 28);

    line5 = $('#penalty9').position();
    line5.left = parseInt($('#lines_WP').position().left);
    line5.width =  parseInt($('#lines_WP').width() + 7);
    line5.height = parseInt($('#corectbtn').position().top + ($('#corectbtn').height() / 2) - line5.top + line5.top - $('#lines_WP').position().top - 10) ;
    line5.top = parseInt(line5.top - $('#lines_WP').position().top + 28);

    line6 = $('#penalty1').position();
    line6.left = parseInt($('#lines_WP').position().left);
    line6.width =  parseInt($('#lines_WP').width() + 7);
    line6.height = parseInt($('#corectbtn').position().top + ($('#corectbtn').height() / 2) - line6.top + line6.top - $('#lines_WP').position().top + 10) ;
    line6.top = parseInt(line6.top - $('#lines_WP').position().top + 28);

    var position = [];
    position.push(line1);
    position.push(line2);
    position.push(line3);
    position.push(line4);
    position.push(line5);
    position.push(line6);
    document.getElementById('lines_WP').innerHTML = '';
    var top = 64;
    for (var i = 0; i<6; i++){
        var svg1 = '<svg width="'+parseInt($('#lines_WP').width() + 10)+'px" height="'+(parseInt($('#lines_WP').height())+3)+'px" id="SVG'+i+'" style="position:absolute" viewBox="0 0 '+parseInt($('#lines_WP').width()+ 10)+' '+(parseInt($('#lines_WP').height())+3)+'"\
        xmlns="http://www.w3.org/2000/svg" version="1.1">\
        <path d="M 2, '+position[i].top+' C '+(position[i].width - 30)+', '+position[i].top+', 30, '+position[i].height+', '+position[i].width+', '+position[i].height+'"\
        fill="none" stroke="#666" stroke-width="2"  />\
        </svg>';
        $('#lines_WP').append(svg1);
    }
    if (fullgame === false){
        document.getElementById('SVG5').style.display = 'none';
    } else {
        $('#SVG5').fadeIn('fast');
    }
}

function sendping(){
    if (Ping>0){
        var NewTime = new Date().getTime();
        if (NewTime - Ping > 10000){
            clearInterval(pinginterval);
            reconnect();
        }
    }
}

function reconnect(){
    connect();
}

function hidepenlaty1(){
    line5.attr({
        strokeWidth: 0
    });
    line5l.attr({
        strokeWidth: 0
    });
    line5a.attr({
        strokeWidth: 0
    });
}

function showpenlaty1(){
    line5.attr({
        strokeWidth: 2
    });
    line5l.attr({
        strokeWidth: 2
    });
    line5a.attr({
        strokeWidth: 2
    });
}
function hidepenlaty9(){
    line4.attr({
        strokeWidth: 0
    });
    line4l.attr({
        strokeWidth: 0
    });
    line4a.attr({
        strokeWidth: 0
    });
}

function showpenalty9(){
    line4.attr({
        strokeWidth: 2
    });
    line4l.attr({
        strokeWidth: 2
    });
    line4a.attr({
        strokeWidth: 2
    });
}

function getbanner(){
    $.ajax({
        type: "POST",
        url: "req.inc.php",
        data: { banner: 'true'}
    })
        .done(function( msg ) {
            showbanner(msg);
        });
}

function showbanner(banner){
    if (banner == '' || banner == 'error'){
        $('.banner').fadeOut('fast');
    } else {
        banner = JSON.parse(banner);
        if (banner.msg != ''){
            $('.title').html(banner.title);
            $('.msg').html(banner.msg);
            $('.banner').fadeIn('slow');
        }
    }
}

$(document).ready(function(){
    getbanner();
});

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