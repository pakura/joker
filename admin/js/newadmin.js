function addnewadmin(){
    var username = $('#username').val();
    var password = $('#password').val();
    var group = $('#group').val();
    var ips = $('#ipaddress').val();
    if (username == '' || password == '' || group == '' || ips == ''){
        alert('შეავსეთ ყველა ველი');
        return;
    }
    $.ajax({
        type: "POST",
        url: "inc/newadmin.inc.php",
        data: { username: username , password: password, group: group, ipaddres: ips }
    })
        .done(function( msg ) {
            getadmins();
            alert(msg);
        });
}


$(document).ready(function(){
    getadmins();
});

function getadmins(){
    $.ajax({
        type: "POST",
        url: "inc/newadmin.inc.php",
        data: { get: 'true' }
    })
        .done(function( msg ) {
            Writeadmins(msg);
        });
}

function Writeadmins(admins){
    admins = admins.split('`')
    $('#admins').html('');
    for (i=0; i<admins.length-1; i++){
        var adminarray = admins[i].split('~');
        div = '<div class="admin">';
        div += '<div class="admin_id">'+adminarray[0]+'</div>';
        div += '<input class="admin_username" id="name'+adminarray[0]+'" value="'+adminarray[1]+'" readonly>';
        div += '<input class="admin_group" id="group'+adminarray[0]+'" value="'+adminarray[2]+'" readonly>';
        div += '<input class="admin_ip" id="ip'+adminarray[0]+'" value="'+adminarray[3]+'" readonly>';
        if (adminarray[0] != '-1'){
            div += '<div class="admin_delete" onclick="deleteadmin('+adminarray[0]+')">Delete</div>';
            div += '<div class="admin_edit" id="edit'+adminarray[0]+'" onclick="editadmin('+adminarray[0]+')">Edit</div>';
        }
        div += '</div>';
        $('#admins').append(div);
    }
}

var edit = false;

function editadmin(id){
    if (edit === false){
        edit = true;
        document.getElementById("name"+id).style.border = "1px solid #FFF";
        document.getElementById("name"+id).readOnly = false;
        document.getElementById("group"+id).style.border = "1px solid #FFF";
        document.getElementById("group"+id).readOnly = false;
        document.getElementById("ip"+id).style.border = "1px solid #FFF";
        document.getElementById("ip"+id).readOnly = false;
        document.getElementById("edit"+id).innerHTML = 'Save';
    } else {
        edit = false;
        var username = $('#name'+id).val();
        var group = $('#group'+id).val();
        var ip = $('#ip'+id).val();
        $.ajax({
            type: "POST",
            url: "inc/newadmin.inc.php",
            data: { update: 'true', id: id, username: username, group: group, ip: ip }
        })
            .done(function( msg ) {
                if (msg == 'ok'){
                    alert('წარმატებით დარედაქტირდა');
                    getadmins();
                } else {
                    console.log(msg);
                    alert(msg);
                }
            });
    }

}


function deleteadmin(id){
    $.ajax({
        type: "POST",
        url: "inc/newadmin.inc.php",
        data: { delete: 'true', id: id }
    })
        .done(function( msg ) {
            if (msg == 'ok'){
                alert('წარმატებით წაიშალა');
                getadmins();
            } else {
                alert(msg);
            }
        });
}