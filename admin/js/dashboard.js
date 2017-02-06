$(document).ready(function(){
    search();
});
var limit = 0;
var total_rake = 0;
var tota_clare_rake = 0;
var total_players = 0;
var Total_tables = 0;
var total_deposit = 0;
var total_withdrow = 0;
var cnt = 0;

function filtersubmit (e) {
    if (e.keyCode == 13) {
        search();
    }
}

function search(){
    var from = $('#datetimepicker_start').val();
    var to = $('#datetimepicker_end').val();
    limit = 0;
    $('#rows').html('');
    total_rake = 0;
    tota_clare_rake = 0;
    total_players = 0;
    Total_tables = 0;
    total_deposit = 0;
    total_withdrow = 0;
    cnt = 0;
    SendRec(from, to);
}

function SendRec(from, to){
    $.ajax({
        type: "POST",
        url: "inc/dashboard.inc.php",
        data: { from: from, to: to, limit: limit}
    })
    .done(function( msg ) {
            WriteStat(msg);
            limit += 20;
    });
}

function WriteStat(Data){
    Data = Data.split(',');
    for (i=0; i<Data.length-1; i++){
        var obj = Data[i].split(';');
        div = '<div class="tabletr">';
        div += '<div class="datetd">'+obj[0]+'</div>';
        div += '<div class="raketd">'+(obj[1] / 100).toFixed(2)+' GEL</div>';
        div += '<div class="raketd">'+(obj[2] / 100).toFixed(2)+'</div>';
        div += '<div class="playernumtd">'+obj[3]+'</div>';
        div += '<div class="tablenumtd">'+obj[4]+'</div>';
        div += '<div class="deposittd">'+(obj[5] / 100).toFixed(2)+' GEL</div>'
        div += '<div class="withdrowtd">'+(obj[6] / 100).toFixed(2)+' GEL</div>';
        div += '</div>';
        $('#rows').append(div);
        total_rake += obj[1] / 100;
        tota_clare_rake += obj[2] / 100
        total_players += parseInt(obj[3]);
        Total_tables += parseInt(obj[4]);
        total_deposit += obj[5] / 100;
        total_withdrow += obj[6] / 100;
        cnt++;
    }
    $('#total').html('<b>ჯამში: </b> Rake: '+total_rake.toFixed(2)+' GEL, Clear Rake: '+tota_clare_rake.toFixed(2)+' GEL, Players: '+total_players+', Tables: '+Total_tables+', Deposit: '+total_deposit.toFixed(2)+' GEL, Withdrow: '+total_withdrow.toFixed(2)+' GEL');
    $('#avarage').html('<b>საშუალოდ: </b>Rake:'+(total_rake / cnt).toFixed(2)+' GEL, Clear Rake: '+(tota_clare_rake / cnt).toFixed(2)+' GEL, Players: '+(total_players / cnt).toFixed(1)+', Tables: '+(Total_tables / cnt).toFixed(1)+', Deposit: '+(total_deposit / cnt).toFixed(2)+' GEL, Withdrow: '+(total_withdrow / cnt).toFixed(2)+' GEL');
}

function loadmore(){
    var from = $('#datetimepicker_start').val();
    var to = $('#datetimepicker_end').val();
    $.ajax({
        type: "POST",
        url: "inc/dashboard.inc.php",
        data: { from: from, to: to, limit: limit}
    })
        .done(function( msg ) {
            WriteStat(msg);
            limit += 20;
        });
}