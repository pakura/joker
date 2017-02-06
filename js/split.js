var index = 1;
var tableid = index++;
var name = index++;
var userid = index++;
var userHex = index++;
var balance = index++;
var roundId = index++;
var stake = index++;
var jokerType = index++;
var penaltyType = index++;
var penalty8 = index++;
var penalty9 = index++;
var overallClaim = index++;
var nPlayers = index++;
var stage = index++;
var roundInStage = index++;
var cardsToEachPlayer = index++;
var trumpCard = index++;
var whoplay = index++;
var timer = index++;
var totalPlayTime = index++;
var playerlog = index++;
var yourSit = index++;
var isBotPlaying = index++;
var yourCards = index++;
var youtTurn = index++;
var possibleTurns = index++;
var playerindex = 0;
var claim0 = playerindex++;
var inhand0 = playerindex++;
var got0 = playerindex++;
var played0 = playerindex++;
var claim1 = playerindex++;
var inhand1 = playerindex++;
var got1 = playerindex++;
var played1 = playerindex++;
var claim2 = playerindex++;
var inhand2 = playerindex++;
var got2 = playerindex++;
var played2 = playerindex++;
var claim3 = playerindex++;
var inhand3 = playerindex++;
var got3 = playerindex++;
var played3 = playerindex++;
var curMsg = '';
var game_sounds = true;
var Protocol={
    TABLE_STATE  :'102',
    PING_CODE    :'101',
    FINAL_STAGE  :'104',
    PAPER_LIST   :'158',
    ACEING       :'160',
    EndGame      :'104',
    UserSeat     :'61',
    LastTake     :'62',
    ForcedStop   :'72',
    Avatars      :'29',
    Settings     :'75'
}

function connect(){
    if (websocket){
        if (websocket.readyState == WebSocket.OPEN || websocket.readyState == WebSocket.CONNECTING){
            websocket.close();
        }
    }
    // websocket = new WebSocket("ws://192.168.1.48:8080");
    //websocket = new WebSocket("ws://185.68.9.98:8080");
    websocket = new WebSocket("ws://185.68.9.98:8080/joker");
    websocket.onerror = onerror_g;
    websocket.onopen = onopen_g;
    websocket.onmessage = onmessage_g;
}

function onerror_g(evt){
    log("Connection error");
    Conn = setInterval(reconnect, 2000);
}

function onopen_g(evt){
    websocket.send(sessionData);
    start_game.play();
    log('Connected');
} //init first message


function onmessage_g(evt){
    $(".reloadbg").fadeOut();
    $(".bubblingG").fadeOut();
    clearInterval(logininterval);
    clearInterval(Conn);
    clearInterval(pinginterval);
    pinginterval = setInterval(function(){sendping()}, 3000);
    Ping = new Date().getTime();
    log(evt.data);
    curMsg += evt.data;
    if( curMsg.indexOf('@') === -1 ) return;
    log( curMsg );
    var Data = curMsg.split('@');
    curMsg = Data[ Data.length - 1 ];

    msg = [];
    for (var i=0; i<Data.length-1; i++){
        msg = Data[i].split(',');
        init(msg);
    }
}