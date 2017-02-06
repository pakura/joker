var websocket;
var curMsg = '';
var ready = false;
var sessionData='11,6,1,'+admin_id+','+session_id+',0\u0000';
function connect(){
    if (websocket){
        if (websocket.readyState == WebSocket.OPEN || websocket.readyState == WebSocket.CONNECTING){
            websocket.close();
        }
    }
    //websocket = new WebSocket("ws://192.168.1.44:8080");
   //websocket = new WebSocket("ws://185.68.9.98:8080");
    websocket = new WebSocket("ws://185.68.9.98:8080/joker");
    websocket.onerror = onerror_g;
    websocket.onopen = onopen_g;
    websocket.onmessage = onmessage_g;
}

function onerror_g(evt){
    console.log('Connect error');
}

function onopen_g(evt){
    websocket.send(sessionData);
    console.log(sessionData);
} //init first message

function onmessage_g(evt){
    curMsg += evt.data;
    if( curMsg.indexOf('@') === -1 )
        return;
    var Data = curMsg.split('@');
    curMsg = Data[ Data.length - 1 ];
    msg = [];
    for (var i=0; i<Data.length-1; i++){
        msg = Data[i].split(',');
        init(msg);
    }

}

function init(msg){
    switch (msg[0]){
        case '102':
            console.log(msg);
            if (ready === false){
                Get_Tables(20);
            }

            break;
        case '101':
            if (msg[1] != 0){
                console.log(msg);
            }
            break;
        case '64':
            console.log(msg);
            ready = true;
            SplitTables(msg);
            break;
        case '67':
            console.log(msg);
            ShowInfo(msg);
            break;
        case '71':
            console.log(msg);
            ShowTableStages(msg);
            break;
        case '2':
            break;
        default :
    }
}

function sendlog(str){
    websocket.send(str+'\u0000');
    console.log(str);
}