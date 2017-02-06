setInterval(function(){
    reportchecker();
},1000);

$( document ).ready(function() {
    reportchecker();
});

function reportchecker(){
    $.ajax({
        type: "POST",
        url: "inc/report.inc.php",
        data: { check: true}
    })
    .done(function( msg ) {
        if (msg == 'true'){
            alertreport();
        } else {
            stopalertreport();
        }
    });
}

function alertreport(){
    $( "#menu_report" ).addClass( 'menu_item_alert' );
    $( "#report_section" ).addClass( 'menu_item_alert' );
}
function stopalertreport(){
    $( "#menu_report" ).removeClass( 'menu_item_alert' );
    $( "#report_section" ).removeClass( 'menu_item_alert' );
}


var limit = 0;

function getreport(){
    $.ajax({
        type: "POST",
        url: "inc/report.inc.php",
        data: { get: true, limit: limit}
    })
        .done(function( msg ) {
            WritReports(msg);
            limit += 20;
        });
}



function confirm(id){
    $.ajax({
        type: "POST",
        url: "inc/report.inc.php",
        data: { confirm: id}
    })
        .done(function( msg ) {
            $('#Tables_container').html('');
            limit = 0;
            getreport();
        });
}

function ignore(id){
    $.ajax({
        type: "POST",
        url: "inc/report.inc.php",
        data: { hide: id}
    })
        .done(function( msg ) {
            $('#Tables_container').html('');
            limit = 0;
            getreport();
        });
}


function WritReports(reports){
    reports = reports.split('`');
    for (i=0; i<reports.length-1; i++){
        var report = reports[i].split('~');
        div = '<div class="report_item">';
        div += '<div class="table_id" onclick="OpenTable('+report[1]+',0,0,'+report[0]+')">Table: '+report[1]+'</div>';
        div += '<div class="reporter">Reporter: '+report[2]+'</div>';
        div += '<div class="reported">Reported: '+report[3]+', '+report[4]+'</div>';
        div += '<div class="datetime">Date/Time: '+report[5]+'</div>';
        if (report[6] == 0){
            div += '<div class="unview" onclick="makeread('+report[0]+')">უნახავი</div>';
        }
        if (report[6] == 1){
            div += '<div class="view">ნანახი</div>';
        }
        if (report[6] == 2){
            div += '<div class="confirmed">დადასტურეული</div>';
        }
        div += '<div class="confirm" onclick="confirm('+report[0]+')"><img src="img/confirm.png" title="დადასტურება" width="24px"></div>';
        div += '<div class="confirm" onclick="ignore('+report[0]+')"><img src="img/cancel.png" title="წაშლა" width="24px"></div>';
        div += '</div>';
        $('#Tables_container').append(div);
    }
}

function OpenTable(tableid,stage,round,id){
    makeread(id);
    window.open("../adminview.php?tableid="+tableid+"&userid=163622&stage="+stage+"&round="+round, "_blank");
}

function makeread(id){
    $.ajax({
        type: "POST",
        url: "inc/report.inc.php",
        data: { read: id}
    })
        .done(function( msg ) {
            if (msg == 'ok'){
                limit = 0;
                $('#Tables_container').html('');
                getreport();
            }
        });
}

function loadmore(){
    getreport();
}