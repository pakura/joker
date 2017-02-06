var PPlayed = [0,0,0,0];
var loginonce = false;
var User_ID;
var MyAction = false;
var AllowCards = null;
var positionarray= [];
var My_Position;
var jokerCard;
var websocket;
var PaperList = '';
var curretround = true;
var fullstat = true;
var allow_paper_show = false;
var firstjokeraction = 0;
var pinginterval;
var Ping = 0; var Conn;
var fullpaper = '';
var TableId = 0;
var playeridqueue = [];
var playernamequeue = [];

function login_player(RoundID, UserId){
    TableId = RoundID;
    sessionData='11,6,1,'+UserId+','+ses_id+',0\u0000';
    connect();
} //login player

function hex2asc(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
} //hexx to text for usernames

function sendlog(str){
    websocket.send(str+'\u0000');
    log('========= SEND: '+str+'=========');
}

function log(str){
    console.log(str);
}

////////////////////////////////////////
function init(data_MSG){
    switch (data_MSG[0]){
        case Protocol.ACEING:
            log('--------------------');
            log(data_MSG);
            log('--------------------');
            Aceing_Action(data_MSG);
            break;
        case Protocol.TABLE_STATE:
            if (loginonce === false){
                sendlog('63,'+TableId+','+Stage+','+Round);
                loginonce = true;
            }
            User_ID = data_MSG[userid];
            My_Position = data_MSG[0];
            wrtitelog(data_MSG);
            trumpcardaction(data_MSG[trumpCard]);
            ReturnGame(data_MSG[isBotPlaying]);
            SetPositionEachPlayer(data_MSG[playerlog]);
            MyTurnAction(data_MSG[youtTurn], data_MSG[cardsToEachPlayer], data_MSG[possibleTurns]);
            InitFirstAction(data_MSG[playerlog]);
            CountOthersCard(data_MSG[playerlog]);
            SetTimer(data_MSG[whoplay], data_MSG[timer], data_MSG[totalPlayTime]);
            newhand(data_MSG[playerlog]);
            GameInfo(data_MSG);
            break;
        case Protocol.PING_CODE:
            if (data_MSG[1] != '0@'){
                log(data_MSG);
            }
            break;
        case Protocol.PAPER_LIST:
            document.getElementById('FullPaperBTN').style.display = 'block';
            PaperStation(data_MSG);
            break;
        case Protocol.EndGame:
            GameOver(data_MSG);
            break;
        case Protocol.UserSeat:
            log(data_MSG);
            UserSeatCards(data_MSG[1]);
            break;
        case Protocol.LastTake:
            log(data_MSG);
            lasttakendcards(data_MSG);
            break;
        case Protocol.AllCards:
            splitcards(data_MSG);
            break;
        case Protocol.UserNames:
            ShowNames(data_MSG);
            fillnamearray(data_MSG);
            break;
        case Protocol.UserId:
            fillarray(data_MSG);
            document.getElementById('stoptableBTN').style.display = 'block';
            break;
    }
} //init all funtion
////////////////////////////////////////

function wrtitelog(data){
    log('<<<'+data);
    log('|||||||||||||||||||||||||||||||');
    log('userid: '+data[userid]);
    log('userhax: '+data[userHex]);
    log('cardsToEachPlayer: '+data[cardsToEachPlayer]);
    log('Who Play: '+data[whoplay]);
    log('trumpr Card: '+data[trumpCard]);
    log('playerlog: '+data[playerlog]);
    log('yourSit: '+data[yourSit]);
    log('yourCards: '+data[yourCards]);
    log('youtTurn: '+data[youtTurn]);
    log('Timer: '+data[timer]);
    log('possibleTurns: '+data[possibleTurns]);
    log('overallClaim: '+data[overallClaim]);
    log('|||||||||||||||||||||||||||||||');
}

function CardCodeToCardVisual(card, Pos){

    Pos = parseInt(Pos);
    if (Pos % 2 == 0) {
        var div = '<div id="' + card + '" class="cards" style="z-index: 1; background-image: url(img/cards/' + card + '.png); " onclick="ThrowCard(\'' + card + '\')"></div>';
    } else {
        var div = '<div class="undercards_1" style="z-index: 1; background-image: url(img/cards/'+Pos+'/' + card + '.png); margin-top: -30%;" onclick="ThrowCard(\'' + card + '\')"></div>';
    }
    return div;
} //card code to image

function trumpcardaction(card){
    switch (card){
        case '':
            var src = 'under';
            break;
        case undefined:
            var src = 'under';
            break;
        case '0':
            var src = 'he';
            break;
        case '1':
            var src = 'oe';
            break;
        case '2':
            var src = 'xe';
            break;
        case '3':
            var src = 'se';
            break;
        case '4':
            var src = 'x6';
            break;
        default:
            var src = card;
            break;
    }
    document.getElementById('trump_card').src = 'img/cards/'+src+'.png';
} //show trumpr card

//function ShowYourCards(cards){
//    var MyCards = [];
//    document.getElementById('Cards_for_player0').innerHTML = '';
//    for (var i=0; i < cards.length; i+=2){
//        var card = cards.charAt(i)+cards.charAt(i+1);
//        if (MyCards.indexOf(card) == -1){
//            MyCards.push(card);
//            $('#Cards_for_player0').append(CardCodeToCardVisual(card));
//        }
//    }
//} //show your cards

function splitcards(Cards){
    for (var i = 1; i<5; i++){
        var PCards = Cards[i].split(';');
        ShowCards(PCards, i-1);
    }
}
var Playerscard = [[],[],[],[]];
function ShowCards(cards, Pos){
    Pos = parseInt(Pos);
    for (var i = 0; i<cards.length; i++){
        Playerscard[Pos].push(cards[i]);
    }
    document.getElementById('Cards_for_player'+Pos).innerHTML = '';
    for (i = 0; i<Playerscard[Pos].length; i++){
        if (Playerscard[Pos].indexOf(cards[i]) != -1){
            $('#Cards_for_player'+Pos).append(CardCodeToCardVisual(cards[i], Pos));
        }
    }
} //show your cards

function getthisscore(claim, got){
    claim = parseInt(claim); got = parseInt(got);
    if (got < 0 || claim < 0 || isNaN(got) || isNaN(claim)){
        got = '0';
        claim = '-';
        return '<span style="color: #CCC">'+got+' / '+claim+'</span>';
    }
    if (got > claim){
        return '<span style="color: #890404">'+got+' / '+claim+'</span>';
    }
    if (got == claim){
        return '<span style="color: #0BA952">'+got+' / '+claim+'</span>';
    }
    if (got < claim){
        return  '<span style="color: #CCC">'+got+' / '+claim+'</span>';
    }
} //write n show players claim and got cards

function SetTrump(trump){
    if (trump == "0" || trump == "1" || trump == "2" || trump == "3" || trump == "4"){
        sendlog('23,'+trump);
        document.getElementById('claim_WP').style.display = "none";
    }
} //choose trumpr card n send

function MyTurnAction(myturn, totalcards, turns){
    switch (myturn){
        case '2':
            MyAction = true;
            AllowCards = turns;
            break;
        default :
            break;
    }
} //init my action

function inithowmany(total, allowcall){
    for (var i=0; i<=total; i++){
        if (allowcall.indexOf(i) != -1){
            document.getElementById("call"+i).disabled = false;
            document.getElementById('call'+i).style.display = 'inline';
        } else {
            document.getElementById("call"+i).disabled = true;
            document.getElementById('call'+i).style.display = 'inline';
        }
    }
    for (var i=parseInt(total)+1; i<=9; i++){
        document.getElementById('call'+i).style.display = 'none';
    }

} //write how many I can call

function SetHowMany(call){
    sendlog('21,'+call);
    document.getElementById('ChooseHowMany_WP').style.display = 'none';
} //send, howmany I need

function ThrowCard(card){
    if (MyAction === true){
        if (AllowCards.indexOf(card) != -1){
            jokerCard = card;
            MyAction = false;
            if (card != 'x6' && card != 's6'){
                ThrowMyCard(card, ',-1,-1');
            } else {
                card = AllowCards.search(card);
                card+=2;
                if (AllowCards.charAt(card) == '2'){
                    document.getElementById('OnJokerAction_WP').style.display = 'block';
                } else {
                    document.getElementById('FirstJokerAction_WP').style.display = 'block';
                }
            }
        } else {
            document.getElementById(card).style.border = "2px solid red";
            setInterval(function(){
                $('#'+card).animate({
                    borderWidth: 0
                }, 300);
            }, 500);
        }
    }
} //chack if I cand throw this card n throw

function ThrowMyCard(card, action){
    var StartTop = document.getElementById('Cards_for_player0').style.top;
    var StartLeft = document.getElementById('player0_thrown_card').style.left;
    var EndTop = document.getElementById('player0_thrown_card').style.top;
    var width = document.getElementById('player0_thrown_card').style.width;
    var height = document.getElementById('player0_thrown_card').style.height;
    PPlayed[0] = 1;
    sendlog('22,'+card+action);
} //hide thrown cards n send thrown card

function JokerAction(action){
    document.getElementById('OnJokerAction_WP').style.display = 'none';
    document.getElementById('FirstJokerAction_WP').style.display = 'none';
    ThrowMyCard(jokerCard,','+action);
} //send joker action

function InitFirstAction(Plog){
    Plog = Plog.split(';');
    for (var i=0; i<=3; i++){
        log('Player: '+i+'  Card: '+Plog[i*4+3]+'  PPlayer: '+PPlayed);
        var Card = Plog[i*4+3];
        if (Plog[i*4+3] != ''){
            PPlayed[i]++;
            if (PPlayed[i] == 1){
                document.getElementById('P'+i+'ThrownCardAnimate').style.display = 'block';
                if (Card.length > 1){
                    ShowAction(i, Card);
                }
            }
        } else {
            PPlayed[i] = 0;
            document.getElementById('P'+i+'ThrownCardAnimate').style.display = 'none';
        }
    }
} //init action

function ShowAction(N, Played){
    if (Played.length > 2){
        ShowJokerAction(N, Played.substring(2,4));
        Played = Played.substring(0,2);
    }
    if (N % 2 == 0){
        var StartLeft = document.getElementById('player0_thrown_card').style.left;
        var StartTop = document.getElementById('Cards_for_player'+N).style.top;
        var EndTop = document.getElementById('player'+N+'_thrown_card').style.top;
    } else {
        var StartLeft = document.getElementById('Cards_for_player'+N).style.left;
        var StartTop = document.getElementById('player1_thrown_card').style.top;
        var EndLeft = document.getElementById('player'+N+'_thrown_card').style.left;
    }
    var width = document.getElementById('player0_thrown_card').style.width;
    var height = document.getElementById('player0_thrown_card').style.height;
    document.getElementById('P'+N+'ThrownCardAnimate').style.opacity = "0";
    document.getElementById('P'+N+'ThrownCardAnimate').style.top = StartTop;
    document.getElementById('P'+N+'ThrownCardAnimate').style.left = StartLeft;
    document.getElementById('P'+N+'ThrownCardAnimate').style.width = width;
    document.getElementById('P'+N+'ThrownCardAnimate').style.height = height;
    document.getElementById('P'+N+'ThrownCardAnimate').style.backgroundImage = "url('img/cards/"+Played+".png')"
    document.getElementById('P'+N+'ThrownCardAnimate').style.backgroundSize = width+' '+height;
//    var deg = Math.floor( Math.random() * ( 1 + 15 - -15 ) ) + -15;
//    $('#P'+N+'ThrownCardAnimate').rotate(deg);
    if (N % 2 == 0){
        $('#P'+N+'ThrownCardAnimate').animate({
            top: EndTop,
            opacity: 1
        }, 200);
    } else {
        $('#P'+N+'ThrownCardAnimate').animate({
            left: EndLeft,
            opacity: 1
        }, 200);
    }
} //throw players cards

function CountOthersCard(PLog){
    PLog = PLog.split(';');
    var CardCNT = [0,0,0,0];
    for (var i = 1; i<=3; i++){
        for (var j = 1; j<=parseInt(PLog[i*4+1]); j++){
            CardCNT[i] = j;
        }
        if (i % 2 == 1){
            ChangeCardsnum(CardCNT[i], i);
        }
    }

} //count other players cards

function ChangeCardsnum(CNT, Pos){
    var H = parseInt(($('#Cards_for_player1').width() * 0.72)*0.3);
    allObjects[Pos].y = 530 - (CNT / 2 * H) - (CNT * CNT - CNT);
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    initsize(width, height);
}


var oldplayerTimer = -1; var oldtotlatime = -1; var oldTime = -1; var startTime;
function SetTimer(player, Time, totlatime){
    log('Time: '+Time+'  totlatime: '+totlatime+'  defaultsize: '+defaultsize+' player: '+player);
    claretimer();
    Time = parseInt(Time);
    if (player == -1 || Time == -1){
        return;
    }
    startTime = new Date().getTime();
    document.getElementById('player'+(parseInt(player)+1)).style.boxShadow = '0 0 10px 3px #ccc';
    if (!player){
        player = oldplayerTimer;
    } else {
        oldplayerTimer = player;
    }
    if (!totlatime){
        totlatime = oldtotlatime;
    } else {
        oldtotlatime = totlatime;
    }
    if (!Time){
        Time = oldTime;
    } else {
        oldTime = Time;
    }
    if (player == 0){
        clearTimeout(mytumer);

        mytumer = setTimeout(function(){
            timer_runing_out.play();
        }, (Time-4000));
    } else {
        clearTimeout(mytumer);
    }
    if (player % 2 == 0){
        var W = parseInt(defaultsize * Time / totlatime);
        document.getElementById('P'+player+'timer').style.width = W+'px';
        document.getElementById('P'+player+'timer').style.display = 'block';
        $('#P'+player+'timer').animate({
            width: 0
        }, Time);
    } else {
        var H = parseInt(defaultsize * Time / totlatime);
        document.getElementById('P'+player+'timer').style.height = H+'px';
        document.getElementById('P'+player+'timer').style.display = 'block';
        $('#P'+player+'timer').animate({
            height: 0
        }, Time);
    }
} //set timer for players


function claretimer(){
    $('#P0timer').stop(true,true);
    $('#P1timer').stop(true,true);
    $('#P2timer').stop(true,true);
    $('#P3timer').stop(true,true);
    document.getElementById('P0timer').style.display= 'none';
    document.getElementById('P1timer').style.display= 'none';
    document.getElementById('P2timer').style.display= 'none';
    document.getElementById('P3timer').style.display= 'none';
    document.getElementById('player1').style.boxShadow = '0 0 0';
    document.getElementById('player2').style.boxShadow = '0 0 0';
    document.getElementById('player3').style.boxShadow = '0 0 0';
    document.getElementById('player4').style.boxShadow = '0 0 0';
    document.getElementById('P0timer').style.width = defaultsize;
    document.getElementById('P1timer').style.height = defaultsize;
    document.getElementById('P2timer').style.width = defaultsize;
    document.getElementById('P3timer').style.height = defaultsize;
}

function PaperStation(paperdata){
    allow_paper_show = true;
    paperdata = paperdata.toString();
    var Stages = paperdata.split(";");
    PaperList = '';
    document.getElementById('paper_WP').innerHTML = '';
    curretround = false;
    for (var pulka = 0; pulka < Stages.length; pulka+=2){
        var Rounds = (Stages[pulka]+'').split(",");
        if (pulka == 0) Rounds.splice(0, 1);
        var CurrentRow = [];
        for (var i = 1; i <= Rounds.length; i++) {
            CurrentRow.push(Rounds[i-1]);
            if (i % 9 == 0){
                ShowThisTable(CurrentRow, pulka, i-1);
                CurrentRow = [];
            }
        }
        AddToTalToPaper(Stages[pulka+1]);
    }
    fullpaper = 'ok';
} //init paper

function AddToTalToPaper(totals) {
    var total = totals.split(',');
    if (total[0] != '0' && total[1] != '0' && total[2] != '0' && total[3] != '0'){
        total[0] = parseInt(total[0]) / 100;
        total[1] = parseInt(total[1]) / 100;
        total[2] = parseInt(total[2]) / 100;
        total[3] = parseInt(total[3]) / 100;
        var PaperListTotal = '<div class="total_score">\
                <div style="float:left; width:4%; height: 100%; border-right: 1px solid #16452a;">&nbsp;</div>\
                <div class="total_score_mid">'+total[0].toFixed(1)+'</div>\
                <div class="total_score_mid">'+total[1].toFixed(1)+'</div>\
                <div class="total_score_mid">'+total[2].toFixed(1)+'</div>\
                <div class="total_score_right">'+total[3].toFixed(1)+'</div>\
            </div>';
    } else {
        var PaperListTotal = '<div class="total_score">\
            <div style="float:left; width:4%; height: 100%; border-right: 1px solid #16452a;">&nbsp;</div>\
            <div class="total_score_mid"> </div>\
            <div class="total_score_mid"> </div>\
            <div class="total_score_mid"> </div>\
            <div class="total_score_right"> </div>\
        </div>';
    }
    $('#paper_WP').append(PaperListTotal);
    if (fullpaper == ''){
        log('PaperListTotal: '+PaperListTotal);
        $('#adminPaper').append(PaperListTotal);
    }

} //show full paper

function Aceing_Action(Data){
    Data.shift();
    var Player = parseInt(Data[0]);
    Data.shift();
    var acingTimer = setInterval(function(){
        SetPositionForCards(Player, Data[0]);
        if (Player == 3){
            Player = 0;
        } else {
            Player++;
        }
        Data.shift();
        if (Data.length < 1){
            setTimeout(function(){
                clearInterval(acingTimer);
                document.getElementById('player0_thrown_card').style.background = "none";
                document.getElementById('player1_thrown_card').style.background = "none";
                document.getElementById('player2_thrown_card').style.background = "none";
                document.getElementById('player3_thrown_card').style.background = "none";
                document.getElementById('P0ThrownCardAnimate').style.background = "none";
                document.getElementById('P1ThrownCardAnimate').style.background = "none";
                document.getElementById('P2ThrownCardAnimate').style.background = "none";
                document.getElementById('P3ThrownCardAnimate').style.background = "none";
            }, 1000);
        }
    }, 300);
} //acing action

function GetCoordinate(N, rec){

    if (N % 2 == 0){
        var StartLeft = document.getElementById('trump_card_WP').style.left;
        var StartTop = document.getElementById('trump_card_WP').style.top;
        var EndTop = document.getElementById('player'+N+'_thrown_card').style.top;
        var EndLeft = document.getElementById('player'+N+'_thrown_card').style.left;
    } else {
        var StartLeft = document.getElementById('trump_card_WP').style.left;
        var StartTop = document.getElementById('trump_card_WP').style.top;
        var EndLeft = document.getElementById('player'+N+'_thrown_card').style.left;
        var EndTop = document.getElementById('player'+N+'_thrown_card').style.top;
    }
    var width = document.getElementById('player0_thrown_card').style.width;
    var height = document.getElementById('player0_thrown_card').style.height;
    var coordinate = [];
    coordinate.push(StartLeft);
    coordinate.push(StartTop);
    coordinate.push(EndLeft);
    coordinate.push(EndTop);
    coordinate.push(width);
    coordinate.push(height);
    return coordinate;
} //get coordinate for acing function

function SetPositionForCards(N, Card){
    var coordinate = GetCoordinate(N,'dealer');
    log('Player: '+N+'   Card: '+Card+'   coordinate: '+coordinate);
    document.getElementById('P'+N+'ThrownCardAnimate').style.left = coordinate[0];
    document.getElementById('P'+N+'ThrownCardAnimate').style.top = coordinate[1];
    document.getElementById('P'+N+'ThrownCardAnimate').style.width = coordinate[4];
    document.getElementById('P'+N+'ThrownCardAnimate').style.height = coordinate[5];
    document.getElementById('P'+N+'ThrownCardAnimate').style.backgroundImage = "url('img/cards/"+Card+".png')";
    document.getElementById('P'+N+'ThrownCardAnimate').style.backgroundSize = coordinate[4]+' '+coordinate[5];
    AnimateForCards(N, Card);
}

function AnimateForCards(N, Card){
    document.getElementById('P'+N+'ThrownCardAnimate').style.display = "block";
    var coordinate = GetCoordinate(N);
    if (N % 2 == 0){
        $('#P'+N+'ThrownCardAnimate').animate({
            left: coordinate[2],
            top: coordinate[3]
        }, 400, "easeInBack", function(){
            document.getElementById('player'+N+'_thrown_card').style.backgroundImage = "url('img/cards/"+Card+".png')";
        });
    } else {
        $('#P'+N+'ThrownCardAnimate').animate({
            left: coordinate[2],
            top: coordinate[3]
        }, 400, "easeInBack", function(){
            document.getElementById('player'+N+'_thrown_card').style.backgroundImage = "url('img/cards/"+Card+".png')";
        });
    }
}


function ReturnGame(action){
    if (action == 1){
        document.getElementById('RobotPlay').style.display = 'block';
    } else {
        document.getElementById('RobotPlay').style.display = 'none';
    }
} //show bobot play button

function ContinueGame(){
    sendlog('24');
} //send raturn game

function GameOver(Data){
    document.getElementsByClassName('gameoverbg')[0].style.display = 'block';
    document.getElementById('WIN').style.display = 'block';
    document.getElementById('closeover_btn').style.display = 'block';
    var div = 0;
    for (var i = 1; i<=Data.length; i+=2){
        if (Data[i+1] != -1) {
            document.getElementById('P' + div + 'WIN').innerHTML = '<span>' + hex2asc(Data[i]).substring(0, 10) + '</span><br>' + (parseInt(Data[i + 1]) / 100).toFixed(2) + '<br>ლარი';
        } else {
            document.getElementById('P' + div + 'WIN').innerHTML = '<span>' + hex2asc(Data[i]).substring(0, 10) + '</span><br>დატოვა მაგიდა';
        }
        div++;
    }
}

function ShowJokerAction(N, Action){
    log('ShowJokerAction ok: '+Action);
    if (Action.length == 2){
        log(' if (Action.length == 2)');
        if (firstjokeraction == 0){
            firstjokeraction++;
            var obj = 'jokercall1';
        } else {
            var obj = 'jokercall2';
        }
        document.getElementById(obj).innerHTML = action2text(Action);
        document.getElementById(obj).style.display = 'block';
    }
}

function action2text(Action){
    if (Action.charAt(1) == '?'){
        if (Action.charAt(0) == '1'){
            return 'მოჯოკრა';
        } else {
            return 'ქვემოდან';
        }
    } else {
        var actiontext = '';
        switch (Action){
            case '10':
                actiontext = 'მაღალი გული';
                break;
            case '11':
                actiontext = 'მაღალი აგური';
                break;
            case '12':
                actiontext = 'მაღალი ჯვარი';
                break;
            case '13':
                actiontext = 'მაღალი ყვავი';
                break;
            case '00':
                actiontext = 'წაიღოს გულმა';
                break;
            case '01':
                actiontext = 'წაიღოს აგურმა';
                break;
            case '02':
                actiontext = 'წაიღოს ჯვარმა';
                break;
            case '03':
                actiontext = 'წაიღოს ყვავმა';
                break;
        }
        return actiontext;
    }
}

function newhand(data) {
    data = data.split(';');

    if (data[played0] == '' && data[played1] == '' && data[played2] == '' && data[played3] == ''){
        log('clare joker action ok: '+data[played1]+' '+data[played0]+' '+data[played2]+' '+data[played3]);
        document.getElementById('jokercall1').style.display = 'none';
        document.getElementById('jokercall2').style.display = 'none';
        firstjokeraction = 0;
    }
}

function UserSeatCards(Player){
    setTimeout(function(){
        CollectCards(Player);
        TakeCards(Player);
    }, 1000);
}

function CollectCards(Player){
    var p0 = $('#P0ThrownCardAnimate').position();
    var p1 = $('#P1ThrownCardAnimate').position();
    var p2 = $('#P2ThrownCardAnimate').position();
    var p3 = $('#P3ThrownCardAnimate').position();
    switch (Player){
        case '0':
            $('#P1ThrownCardAnimate').animate({
                left: p0.left,
                top: p0.top
            }, 200);
            $('#P2ThrownCardAnimate').animate({
                left: p0.left,
                top: p0.top
            }, 300);
            $('#P3ThrownCardAnimate').animate({
                left: p0.left,
                top: p0.top
            }, 200);
            break;
        case '1':
            $('#P2ThrownCardAnimate').animate({
                left: p1.left,
                top: p1.top
            }, 200);
            $('#P3ThrownCardAnimate').animate({
                left: p1.left,
                top: p1.top
            }, 300);
            $('#P0ThrownCardAnimate').animate({
                left: p1.left,
                top: p1.top
            }, 200);
            break;
        case '2':
            $('#P3ThrownCardAnimate').animate({
                left: p2.left,
                top: p2.top
            }, 200);
            $('#P0ThrownCardAnimate').animate({
                left: p2.left,
                top: p2.top
            }, 300);
            $('#P1ThrownCardAnimate').animate({
                left: p2.left,
                top: p2.top
            }, 200);
            break;
        case '3':
            $('#P0ThrownCardAnimate').animate({
                left: p3.left,
                top: p3.top
            }, 200);
            $('#P1ThrownCardAnimate').animate({
                left: p3.left,
                top: p3.top
            }, 300);
            $('#P2ThrownCardAnimate').animate({
                left: p3.left,
                top: p3.top
            }, 200);
            break;
    }
}

function TakeCards(Player){
    Player = parseInt(Player) + 1;
    var position = $('#player'+Player).position();
    $('#P0ThrownCardAnimate').animate({
        left: position.left,
        top: position.top,
        opacity: 0
    }, 500);
    $('#P1ThrownCardAnimate').animate({
        left: position.left,
        top: position.top,
        opacity: 0
    }, 500);
    $('#P2ThrownCardAnimate').animate({
        left: position.left,
        top: position.top,
        opacity: 0
    }, 500);
    $('#P3ThrownCardAnimate').animate({
        left: position.left,
        top: position.top,
        opacity: 0
    }, 500);
}

function lasttakendcards(Data){
    Data.splice(0, 1);
    for (var i = 0; i<4; i++){
        log('num: '+i+' card: '+Data[i]);
        document.getElementById('PLayer'+i+'_card').style.backgroundImage = 'url("img/cards/'+Data[i]+'.png")';
    }
    document.getElementById('LastGoted').style.display = 'block';
}

$( document ).ready(function() {
    $( "#LastGoted" ).click(function() {
        $( "#LastGot_WP" ).fadeToggle( "slow");
    });
});


function GameInfo(Data){
    document.getElementById('stake').innerHTML = 'ფსონი: '+(Data[stake] / 100)+' ლარი';
    document.getElementById('bet_mid').innerHTML = (Data[stake] / 100);
    log('Data[balance]: '+Data[balance]);
    var t =  parseInt(Data[balance]) / 100;
    t +='';
    t = t.substring(0, 4);
    document.getElementById('balance_mid').innerHTML = t;
    document.getElementById('joktype').innerHTML = 'თამაში: '+game2text(Data[jokerType]);
    document.getElementById('jokpenalty').innerHTML = 'ხიშტი: '+penalty2text(Data[penaltyType], Data[penalty8], Data[penalty9], Data[jokerType]);
    document.getElementById('penlatyaction').innerHTML = overclaim(parseInt(Data[overallClaim]));
}

function game2text(Argument){
    Argument +='';
    switch (Argument){
        case '1':
            Argument = 'სრული';
            break;
        case '2':
            Argument = 'ცხრიანები (4)';
            break;
        case '3':
            Argument = 'ცხრიანები (3)';
            break;
        case '4':
            Argument = 'ცხრიანები (2)';
            break;
        default:
            Argument = 'ცხრიანები (4)';
            break;
    }
    return Argument;
}

function penalty2text(A,B,C,D){
    if (A == '2'){
        return 'სპეცი';
    } else {
        if (D != '1'){
            return C;
        } else {
            return B+' / '+C;
        }
    }
}

function overclaim(Argument){
    if (Argument == 0){
        return;
    }
    if (Argument < 0){
        Argument = Argument * -1;
        return 'წაგლეჯვა: '+Argument;
    } else {
        return 'შეტენვა: '+Argument;
    }
}


function ShowNames(Names){
    for (i = 1; i<5; i++){
        document.getElementById('player'+(i)+'_name').innerHTML = hex2asc(Names[i]);
        document.getElementById('PL'+(i-1)).innerHTML = hex2asc(Names[i]);
    }
}

function SetPositionEachPlayer(PlayersData){
    var Players = PlayersData.split(';');
    document.getElementById('player1_score').innerHTML = getthisscore(Players[0], Players[2]);
    document.getElementById('player2_score').innerHTML = getthisscore(Players[4], Players[6]);
    document.getElementById('player3_score').innerHTML = getthisscore(Players[8], Players[10]);
    document.getElementById('player4_score').innerHTML = getthisscore(Players[12], Players[14]);
    // ShowPlayersCards(positionarray, Players);
} //sit all player in their position

function showadminpaper(){
    $( "#adminPaper" ).toggle("slow");
}

function fillarray(ids){
    playeridqueue[0] = ids[1];
    playeridqueue[1] = ids[2];
    playeridqueue[2] = ids[3];
    playeridqueue[3] = ids[4];

}

function fillnamearray(name){
    playernamequeue[0] = name[1];
    playernamequeue[1] = name[2];
    playernamequeue[2] = name[3];
    playernamequeue[3] = name[4];
    writeplayers();
}

function showstop(){
    $('#stoptable_wp').fadeToggle('slow');
}

function writeplayers(){
    $('#lstoppl1').html(hex2asc(playernamequeue[0]));
    $('#lstoppl2').html(hex2asc(playernamequeue[1]));
    $('#lstoppl3').html(hex2asc(playernamequeue[2]));
    $('#lstoppl4').html(hex2asc(playernamequeue[3]));
}

function sendstop(){
    var send = '72,'+TableId+',';
    if (document.getElementById('stoppl1').checked) {
        send += '0,';
    } else {
        send += '1,';
    }
    if (document.getElementById('stoppl2').checked) {
        send += '0,';
    } else {
        send += '1,';
    }
    if (document.getElementById('stoppl3').checked) {
        send += '0,';
    } else {
        send += '1,';
    }
    if (document.getElementById('stoppl4').checked) {
        send += '0,';
    } else {
        send += '1,';
    }
    send += $('#stopmessage').val();
    sendlog(send);
    $('#stoptable_wp').fadeOut('slow');
}

function pouseGame(){
    sendlog('73,'+TableId);
}