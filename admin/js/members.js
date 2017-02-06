/**
 * Created by pakura on 11/18/2014.
 */

function filtersubmit(e) {
    if (e.keyCode == 13) {
        InitFilter();
    }
}

function InitFilter(blocked){
    if (blocked === true){
        InitQuery(5, 0, 0);
        $('#Tables_container').html('');
        return;
    }
    var userid = $('#userid').val();
    var username = $('#username').val();
    var userpin = $('#userpin').val();
    var userip = $('#userip').val();
    if (userid != ''){
        InitQuery(1, userid, 0);
        $('#Tables_container').html('');
        return;
    }
    if (username != ''){
        InitQuery(2, username, 0);
        $('#Tables_container').html('');
        return;
    }
    if (userpin != ''){
        InitQuery(3, userpin, 0);
        $('#Tables_container').html('');
        return;
    }
    if (userip != ''){
        InitQuery(4, userip, 0);
        $('#Tables_container').html('');
        return;
    }
}

function InitQuery(Data, obj, from){
    $.ajax({
        type: "POST",
        url: "inc/users.inc.php",
        data: { filter: Data, statement: obj, from: from }
    })
    .done(function( msg ) {
        showUsers(msg);
    });
}

function showUsers(Data){
    var users = Data.split(',');
    for (i = 0; i<users.length-1; i++){
        var userdate = users[i].split(';');
        div = '<div class="User_WP" >\
            <div class="user_id"><b>User ID</b>: '+userdate[0]+'</div>\
            <div class="UserName_WP">User Name: '+userdate[1]+'</div>\
            <div class="Balance_WP">Balance: '+userdate[2]+'</div>\
            <div class="Table_detail_WP" onclick="userDetailShow('+userdate[0]+')">დეტალურად</div>\
        </div>';
        $('#Tables_container').append(div);
    }
}
var totalrow = 0;
function getMoreUsers(){
    InitQuery(0,0,totalrow);
    totalrow += 20;
}

function userDetailShow(UserId){
    localStorage.userid = UserId;
    window.open('userinfo.php','_self');
}