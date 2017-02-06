$(document).ready(function(){
    console.log('ok');
    SendReq('0,40');
});

function SendReq(limit){
    var from = $('#datetimepicker_start').val();
    var to = $('#datetimepicker_end').val();
    $.ajax({
        type: "POST",
        url: "inc/transaction.inc.php",
        data: { from: from , to: to , limit: limit}
    }).done(function( msg ) {
        console.log(msg);
        WriteTransactions(JSON.parse(msg));
    });
}

function WriteTransactions(json){
    var div = '';
    console.log(json);
    var totaldeposit = 0;
    var totalwithdrow = 0;
    var cnt = 0;
    for (var i in json){
        div = '<div class="tabletr">\
        <div class="datetd">'+ json[i].date+'</div>\
        <div class="raketd"># '+ json[i].table+'</div>\
        <div class="staketd">'+ (json[i].stake.lose / 400).toFixed(2)+' GEL</div>\
        <div class="playernumtd">'+GetPlayers(json[i].players.lose, json[i].players.win)+'</div>\
        <div class="deposittd">'+(json[i].stake.win / 100).toFixed(2)+' GEL</div>\
        <div class="withdrowtd">'+ (json[i].stake.lose / 100).toFixed(2)+' GEL</div>\
        </div>';
        $('#rows').append(div);
        totaldeposit += parseFloat(json[i].stake.lose);
        totalwithdrow+= parseFloat(json[i].stake.win);
        cnt++;
    }
    $('#total').html('<B>ჯამში</B> deposit: '+(totaldeposit / 100).toFixed(5)+' GEL,  withdrow: '+(totalwithdrow / 100).toFixed(5)+' GEL | <B>საშუალოდ</B> deposit: '+(totaldeposit / 100 / cnt).toFixed(5)+' GEL,  withdrow: '+(totalwithdrow / 100 / cnt).toFixed(5)+' GEL')

}

function GetPlayers(lose, win){
    var div = '';
    for (i = 0; i<4; i++){
        if (lose[i] == win[0] || lose[i] == win[1]){
            div += '<span style="color: #FF8A00"> '+lose[i]+' </span>';
        } else {
            div += '<span style="color: #000"> '+lose[i]+' </span>';
        }
    }
    return div;
}