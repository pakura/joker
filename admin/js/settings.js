var add =[0,0,0,0];
$(document).ready(function(){
    GetField();
});

function GetField(){
    $.ajax({
        type: "POST",
        url: "inc/settings.inc.php",
        data: { init: 'true' }
    })
    .done(function( msg ) {
            initsettings(JSON.parse(msg));
    });
}

function initsettings(Data){
    console.log(Data)
    Gamesetting(Data.win_percents);
    SetDefaultbets(Data.stakes);
    SetDefaultTimers(Data.timer);
    SetDefaultPenalty1(Data.penalty1);
    SetDefaultPenalty9(Data.penalty9);
    SetDefaultGameType(Data.jokertype);
    SetDefaultbanner(Data.banner);
}

function Gamesetting(Data){
    Data = Data.split(',');
    document.getElementById('firstplace').value = Data[0];
    document.getElementById('secondplace').value = Data[1];
    document.getElementById('thirdplace').value = Data[2];
    var rake = 100 - Data[0] - Data[1] - Data[2];
    $('#rakecalc').html('რეიკი: '+rake+'%');
}

function rakechange(){
    var firstplace = parseInt($('#firstplace').val());
    var secondplace = parseInt($('#secondplace').val());
    var thirdplace = parseInt($('#thirdplace').val());
    var rake = 100 - firstplace - secondplace -thirdplace;
    $('#rakecalc').html('რეიკი: '+rake+'%');
}

function changerake(){
    var firstplace = parseInt($('#firstplace').val());
    var secondplace = parseInt($('#secondplace').val());
    var thirdplace = parseInt($('#thirdplace').val());
    var total = firstplace + secondplace + thirdplace;
    if (total > 100){
        alert('არასწორია. რეიკი ნაკლებია ვიდრე 0%');
        return;
    }
    total = firstplace+','+secondplace+','+thirdplace;
    $.ajax({
        type: "POST",
        url: "inc/settings.inc.php",
        data: { rake: total }
    })
    .done(function( msg ) {
        alert(msg);
    });
}

function SetDefaultbets(stakes){
    stakes = stakes.split(',');
    $('#bets').html('');
    for (i = 0; i< stakes.length; i++){
        div = '<label for="bet'+(i+1)+'" id="betlabel'+(i+1)+'">ფსონი '+(i+1)+' </label>';
        div += '<input type="text" name="bet'+(i+1)+'" id="bet'+(i+1)+'" value="'+(stakes[i] / 100).toFixed(2)+'"> ';
        div += '<span style="color: #FF9103; cursor: pointer; margin-right: 60px;" id="deletebet'+(i+1)+'" onclick="deletebet('+(i+1)+')">წაშლა</span>';
        div += '<br><br>';
        $('#bets').append(div);
        add[0]++;
    }
}

function deletebet(bet){
    $('#betlabel'+bet).hide();
    $('#bet'+bet).val('');
    $('#bet'+bet).hide();
    $('#deletebet'+bet).hide();
    add[0]--;
}

function addbet(){
    add[0]++;
    if (add[0] < 11) {
        div = '<label for="bet' + add[0] + '" id="betlabel' + add[0] + '">ფსონი ' + add[0] + ' </label>';
        div += '<input type="text" name="bet' + (i + 1) + '" id="bet' + add[0] + '" value="0.00"> ';
        div += '<span style="color: #FF9103; cursor: pointer; margin-right: 60px;" id="deletebet' + add[0] + '" onclick="deletebet(' + add[0] + ')">წაშლა</span>';
        div += '<br><br>';
        $('#bets').append(div);
    } else {
        alert('ფსონების რაოდენობა მეტისმეტია. დიზაინს დაამახინჯებს! :)');
    }
}

function changebet(){
    var bets = '';
    for (i=1; i<= add[0]; i++){
        if (i != add[0]){
            if ($('#bet'+i).val() != ''){
                bets += (parseInt($('#bet'+i).val())*100)+',';
            }
        } else {
            if ($('#bet'+i).val() != ''){
                bets += (parseInt($('#bet'+i).val())*100);
            }
        }
    }
    $.ajax({
        type: "POST",
        url: "inc/settings.inc.php",
        data: { bet: bets }
    })
        .done(function( msg ) {
            alert(msg);
        });
}

function SetDefaultTimers(timer){
    timer = timer.split(',');
    $('#timers').html('');
    for (i=0; i<timer.length; i++){
        div = '<label for="time'+(i+1)+'" id="timerlabel'+(i+1)+'">დრო '+(i+1)+' </label>';
        div += '<input type="text" name="time'+(i+1)+'" id="time'+(i+1)+'" value="'+timer[i]+'"> <span style="color: #FF9103; cursor: pointer" id="deletetimer'+(i+1)+'" onclick="deletetimer('+(i+1)+')">წაშლა</span><br><br>';
        $('#timers').append(div);
        add[1]++;
    }
}

function deletetimer(field){
    $('#timerlabel'+field).hide();
    $('#time'+field).val('');
    $('#time'+field).hide();
    $('#deletetimer'+field).hide();
    add[1]--;
}

function addtimer(){
    add[1]++;
    if (add[1] < 10) {
        div = '<label for="time' + add[1] + '" id="timerlabel' + add[1] + '">დრო ' + add[1] + ' </label>';
        div += '<input type="text" name="time' + (i + 1) + '" id="time' + add[1] + '" value="00"> ';
        div += '<span style="color: #FF9103; cursor: pointer; margin-right: 60px;" id="deletetimer' + add[1] + '" onclick="deletetimer(' + add[1] + ')">წაშლა</span>';
        div += '<br><br>';
        $('#timers').append(div);
    } else {
        alert('ფსონების რაოდენობა მეტისმეტია. დიზაინს დაამახინჯებს! :)');
    }
}

function changetimer(){
    var timer = '';
    for (i=1; i<= add[1]; i++){
        if (i != add[1]){
            if ($('#time'+i).val() != ''){
                timer += parseInt($('#time'+i).val())+',';
            }
        } else {
            if ($('#time'+i).val() != ''){
                timer += parseInt($('#time'+i).val());
            }
        }
    }
    $.ajax({
        type: "POST",
        url: "inc/settings.inc.php",
        data: { timers: timer }
    })
        .done(function( msg ) {
            alert(msg);
        });
}

function SetDefaultPenalty1(penalty){

    penalty = penalty.split(',');
    $('#penalty1wp').html('');
    for (i=0; i<penalty.length - 1; i++){
        div = '<label for="penalty1'+(i+1)+'" id="penalty1label'+(i+1)+'">ხიშტი '+(i+1)+' </label>';
        div += '<input type="text" name="penalty1'+(i+1)+'" id="penalty1'+(i+1)+'" value="'+penalty[i]+'"> <span style="color: #FF9103; cursor: pointer" id="deletepenalty1'+(i+1)+'" onclick="deletepenalty1('+(i+1)+')">წაშლა</span><br><br>';
        $('#penalty1wp').append(div);
        add[2]++;
    }
}

function addpenalty1(){
    add[2]++;
    div = '<label for="penalty1'+add[2]+'" id="penalty1label'+add[2]+'">ხიშტი '+add[2]+' </label>';
    div += '<input type="text" name="penalty1'+add[2]+'" id="penalty1'+add[2]+'" value="0"> <span style="color: #FF9103; cursor: pointer" id="deletepenalty1'+add[2]+'" onclick="deletepenalty1('+add[2]+')">წაშლა</span><br><br>';
    $('#penalty1wp').append(div);
}

function deletepenalty1(field){
    $('#penalty1label'+field).hide();
    $('#penalty1'+field).val('');
    $('#penalty1'+field).hide();
    $('#deletepenalty1'+field).hide();
    add[2]--;
}

function changepenalty1(){
    var penalty1 = '';
    for (i=1; i<= add[2]; i++){
        if (i != add[2]){
            if ($('#penalty1'+i).val() != ''){
                penalty1 += parseInt($('#penalty1'+i).val())+',';
            }
        } else {
            if ($('#penalty1'+i).val() != '') {
                penalty1 += parseInt($('#penalty1' + i).val()) + ',0';
            } else {
                penalty1 += '0';
            }
        }
    }
    $.ajax({
        type: "POST",
        url: "inc/settings.inc.php",
        data: { penalty1: penalty1 }
    })
        .done(function( msg ) {
            alert(msg);
        });
}

function SetDefaultPenalty9(penalty){
    console.log(penalty);
    penalty = penalty.split(',');
    $('#penalty9wp').html('');
    for (i=0; i<penalty.length - 1; i++){
        div = '<label for="penalty9'+(i+1)+'" id="penalty9label'+(i+1)+'">ხიშტი '+(i+1)+' </label>';
        div += '<input type="text" name="penalty9'+(i+1)+'" id="penalty9'+(i+1)+'" value="'+penalty[i]+'"> <span style="color: #FF9103; cursor: pointer" id="deletepenalty9'+(i+1)+'" onclick="deletepenalty9('+(i+1)+')">წაშლა</span><br><br>';
        $('#penalty9wp').append(div);
        add[3]++;
    }
}

function addpenalty9(){
    add[3]++;
    div = '<label for="penalty9'+add[3]+'" id="penalty9label'+add[3]+'">ხიშტი '+add[3]+' </label>';
    div += '<input type="text" name="penalty9'+add[3]+'" id="penalty9'+add[3]+'" value="0"> <span style="color: #FF9103; cursor: pointer" id="deletepenalty9'+add[3]+'" onclick="deletepenalty9('+add[3]+')">წაშლა</span><br><br>';
    $('#penalty9wp').append(div);
}

function deletepenalty9(field){
    $('#penalty9label'+field).hide();
    $('#penalty9'+field).val('');
    $('#penalty9'+field).hide();
    $('#deletepenalty9'+field).hide();
    add[2]--;
}

function changepenalty9(){
    var penalty9 = '';
    for (i=1; i<= add[3]; i++){
        if (i != add[3]){
            if ($('#penalty9'+i).val() != ''){
                penalty9 += parseInt($('#penalty9'+i).val())+',';
            }
        } else {
            if ($('#penalty9'+i).val() != '') {
                penalty9 += parseInt($('#penalty9' + i).val()) + ',0';
            } else {
                penalty9 += '0';
            }
        }
    }
    $.ajax({
        type: "POST",
        url: "inc/settings.inc.php",
        data: { penalty9: penalty9 }
    })
    .done(function( msg ) {
        alert(msg);
    });
}

function SetDefaultGameType(obj){
    obj = obj.split(',');
    for (i=0; i<obj.length; i++){
        document.getElementById("gametype"+obj[i]).checked = true;
    }
}

function SetDefaultbanner(banner){
    console.log(banner);
    $('#banner_title').val(banner.title);
    $('#banner_msg').val(banner.msg);
}

function changeGameType(){
    var type = [];
    if (document.getElementById("gametype1").checked == true){
        type.push(1);
    }
    if (document.getElementById("gametype2").checked == true){
        type.push(2);
    }
    if (document.getElementById("gametype3").checked == true){
        type.push(3);
    }
    if (document.getElementById("gametype4").checked == true){
        type.push(4);
    }
    if (document.getElementById("gametype5").checked == true){
        type.push(5);
    }
    type = type.join();
    $.ajax({
        type: "POST",
        url: "inc/settings.inc.php",
        data: { gametype: type }
    })
        .done(function( msg ) {
            alert(msg);
        });
}

function changebanner(){
    var title = $('#banner_title').val();
    var msg = $('#banner_msg').val();
    $.ajax({
        type: "POST",
        url: "inc/settings.inc.php",
        data: { banner: title, bannermsg: msg }
    })
        .done(function( msg ) {
            alert(msg);
        });
}