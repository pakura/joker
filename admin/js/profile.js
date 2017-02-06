$( document ).ready(function() {
    GetUserInfo();
    GetUserBalance();
    GetUsertransactions();
    GetUserAction();
    GetUserIpLog();
    GetUserPlayedTable('0,20');
});

function GetUserInfo(){
    $.ajax({
        type: "POST",
        url: "inc/profile.inc.php",
        data: { userid: localStorage.userid , for: 1 }
    })
        .done(function( msg ) {
            WriteInfo(msg.split(','));
        });
}


function GetUserPlayedTable(limit){
    $.ajax({
        type: "POST",
        url: "inc/profilestat.inc.php",
        data: { userid: localStorage.userid , for: 2, limit: limit }
    })
        .done(function( msg ) {
            WritePlayedtabled(JSON.parse(msg));
        });
}

function GetUserBalance(){
    $.ajax({
        type: "POST",
        url: "inc/profile.inc.php",
        data: { userid: localStorage.userid , for: 2 }
    })
        .done(function( msg ) {
            $('#userstat1').html('Balance: '+msg+' GEL');
        });
}

function GetUserIpLog(){
    $.ajax({
        type: "POST",
        url: "inc/profile.inc.php",
        data: { userid: localStorage.userid , for: 4 }
    })
        .done(function( msg ) {
            msg = msg.split(',');
            for (i = 0; i<msg.length-1; i++){
                var subarray = msg[i].split(';');
                $('#iplogs').append('<tr><td>IP: </td><td>'+subarray[0]+'</span></td> <td> Date/Time: </td><td>'+subarray[1]+'</td></tr>');
            }

        });
}


function GetUsertransactions(){
    $.ajax({
        type: "POST",
        url: "inc/profile.inc.php",
        data: { userid: localStorage.userid , for: 21 }
    })
        .done(function( msg ) {
            msg = msg.split(',');
            $('#userstat3').html('Deposit: '+parseFloat(msg[0]).toFixed(2)+' GEL  /  '+msg[2]+'<br>Withdraw: '+parseFloat(msg[1]).toFixed(2)+' GEL  /  '+msg[3]);
            WriteTransactions(msg);
        });
}

function WriteTransactions(Data){
    for (i=4; i<Data.length-1; i++){
        var td = Data[i].split(';');
        var div  = '<div class="row"><div class="trid">ID: '+td[0]+'</div><div class="balance">Amount: '+td[2]+' GEL</div><div class="datetime">Date/Time: '+td[3]+'</div>';
        if (td[1] == 2){
            div += '<div class="action" style="color: #0A804A;">Deposit</div></div>';
        } else {
            div += '<div class="action" style="color: #b03e00;">Withdraw</div></div>';
        }

        $('#transaction').append(div);
    }
}

function GetUserAction(){
    $.ajax({
        type: "POST",
        url: "inc/profilestat.inc.php",
        data: { userid: localStorage.userid , for: 1 }
    })
        .done(function( msg ) {
            msg = msg.split(',');
            $('#userstat2').html('Win: '+parseFloat(msg[0]).toFixed(2)+' GEL  /  '+msg[2]+'<br>Lose: '+parseFloat(msg[1]).toFixed(2)+' GEL  /  '+msg[3]+'<br>Win-Lose: '+parseFloat((msg[0] - msg[1])).toFixed(2));
        });
}


function WriteInfo(Data){
    $('#userinfo').html('User Name: '+Data[1]+'\
    <br>\
    User ID: '+Data[0]+'\
    <br>\
    User Pin: '+Data[0]+'\
    <br>\
    Rating: ?\
    <br>\
    <div id="blockuser_WP">Status: </div>');
    GetBlockedaction(Data[2], Data[0]);
}

function GetBlockedaction(Data, ID){
    var div = 'Status: ';
    switch (Data){
        case '1':
            div += '<activ>Active</activ> <button onclick="blockuser('+ID+',0)">Block</button>';
            break;
        case '0':
            div += '<deactiv>Blocked</deactiv> <button onclick="blockuser('+ID+',1)">UnBlock</button>';
            break;
        case '0-3':
            div += '<deactiv>Blocked</deactiv>';
            break;
        case '1-3':
            div += '<activ>Active</activ>';
            break;
    }
    $('#blockuser_WP').html(div);
}

function blockuser(ID, Action){
    var test = prompt("რატომ ბლოკავთ?", "მიზეზი...");
    $.ajax({
        type: "POST",
        url: "inc/profile.inc.php",
        data: { blockuserid: ID , act: Action, test: test }
    })
        .done(function( msg ) {
            msg = msg.split(',');
            GetBlockedaction(parseInt(msg[2]), parseInt(msg[1]));
            alert(msg[0]);
        });
}



function WritePlayedtabled(obj){
    console.log(obj);
    for (var i in obj){
        var div = '<div class="row">';
        div += '<div class="trid">ID: '+obj[i].round_id+'</div>';
        div += '<div class="datetime">Date/Time: '+obj[i].date+'</div>';
        div += '<div class="balance">stake: '+(obj[i].bet / 100).toFixed(2)+' GEL</div>';
        div += '<div class="action" style="color: #0A804A;">Players: '+GetPlayers(obj[i].lose, obj[i].win)+'</div>'
        div += '</div>';
        $('#tablehistory').append(div);
    }
}

function GetPlayers(lose, win){
    var div = '';
    for (i = 0; i<4; i++){
        if (lose[i] == win[0] || lose[i] == win[1]){
            div += '<span style="color: #FF8A00; font-size: 12px;"> '+lose[i]+' </span>';
        } else {
            div += '<span style="color: #333; font-size: 12px;"> '+lose[i]+' </span>';
        }
    }
    return div;
}