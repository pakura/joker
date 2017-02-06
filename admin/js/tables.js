var totaltables = 0;


function Get_Tables(Total){
    sendlog('64,'+Total+','+totaltables);
}

function SplitTables(Tables){
    for(i = 1; i<Tables.length - 1; i+=2){
        writetable(Tables[i], Tables[i+1]);
    }
    totaltables += 20;
}


function writetable(table, date){
    div = ' <div class="Tables_WP">\
    <div class="Play_BTN" onclick="ShowTable('+table+')">გახსნა</div>\
    <div class="Table_ID_WP">მაგიდის ID: '+table+'</div>\
    <div class="Table_date_WP">დაწყების დრო: '+date+'</div>\
    <div class="Table_detail_WP" onclick="DetailShow('+table+')">დეტალურად</div>\
</div>';
    $('#Tables_container').append(div);
}

function filtersubmit (e) {
    if (e.keyCode == 13) {
        initfilter();
    }
}

$(function() {
    $( "#enddate" ).datepicker();
    $( "#startdate" ).datepicker();
});

function initfilter(){
    var tableid = document.getElementById('tableid').value;
    var userid = document.getElementById('userid').value;
    var startdate = document.getElementById('datetimepicker_start').value;
    var enddate = document.getElementById('datetimepicker_end').value;

    if (tableid.length > 3){
        sendlog('69,'+tableid);
    } else {
        if (userid.length > 3){
            document.getElementById('Tables_container').innerHTML = '';
            var ids = userid.split(',');
            sendlog('68,'+ids.length+','+userid);
        } else {
            if (startdate.length > 3 && enddate.length > 3){
                document.getElementById('Tables_container').innerHTML = '';
                sendlog('70,'+startdate+','+enddate+',20,0');
            }
        }
    }
}
function DetailShow(id){
    sendlog('69,'+id);
}

function ShowTable(tableid) {
    sendlog('71,'+tableid);
}

function ShowTableStages(arg){
    var div = '';
    for (i=2; i<arg.length; i++){
        div += '<div class="pulka" onclick="OpenTable('+arg[1]+','+(i-2)+',0)">'+(i-1)+' პულკიდან გახსნა</div>';
        for (j=0; j<parseInt(arg[i]); j++){
            div += '<div class="rounds" onclick="OpenTable('+arg[1]+','+(i-2)+','+j+')">'+(j+1)+' დარიგებიდან გახსნა</div>';
        }
    }
    $('#tablestage').html(div);
    $('.opentable_WP').toggle('slow');
}

function ShowInfo(info){
    $('#detailinner').html('');
    var div = '<b>დაწყო:</b> '+info[5]+'<br><b>დასრულდა: </b>'+info[6]+'<br>\
    <b>ჯოკრს ტიპპი: </b>'+getJokerType(info[8])+' <br> <b>ფსონი: '+(info[7] / 100).toFixed(2)+'</b> ლარი<br> <b>ხიშტი: </b> '+GetPenalty(info[9], info[10], info[11])+'<br>\
    <b>მოთამაშეების ID:</b> <br><span style="color:#FF8C00;">\
    <span style="cursor: pointer;" onclick="selectuserid(\'68,1,'+info[1]+'\')">'+info[1]+'</span>,\
    <span style="cursor: pointer;" onclick="selectuserid(\'68,1,'+info[2]+'\')">'+info[2]+'</span>,\
    <span style="cursor: pointer;" onclick="selectuserid(\'68,1,'+info[3]+'\')">'+info[3]+'</span>,\
    <span style="cursor: pointer;" onclick="selectuserid(\'68,1,'+info[4]+'\')">'+info[4]+'</span>\
    </span>';
    $('#detailinner').append(div);
    $('.detail_WP').show('slow');
}

function selectuserid(log){
    $('#Tables_container').html('');
    sendlog(log);
    $('.detail_WP').hide('slow');
}

function OpenTable(tableid,stage,round){
    window.open("../adminview.php?tableid="+tableid+"&userid="+admin_id+"&stage="+stage+"&round="+round, "_blank");
}

function getJokerType(arg) {
    arg = parseInt(arg);
    switch (arg){
        case 1:
            return 'სრული';
            break;
        case 2:
            return 'ცხრიანები (4)';
            break;
        case 3:
            return 'ცხრიანები (3)';
            break;
        case 4:
            return 'ცხრიანები (2)';
            break;
        case 5:
            return 'ცხრიანები (1)';
            break;
        default :
            return 'უცნობი'
            break;
    }
}

function GetPenalty(type, a, b){
    if (type != '2'){
        return GetPenaltyvalue(a,b);
    } else {
        return 'სპეცი';
    }
}

function GetPenaltyvalue(a,b){
    return 'ჩვეულებრივი: '+a+' / '+b;
}