function showsetting(obj, thisobj){
    for (var i = 1; i<5; i++){
        if (i == obj){
            $('#stgn_'+obj).animate({
                height: 80
            },300, function(){
                //document.getElementsByClassName('btn')[i-1].style.boxShadow = '0 0 5px #FFF';
            });
        } else {
            $('#stgn_'+i).animate({
                height: 0
            },200, function(){
                //document.getElementsByClassName('btn')[i-1].style.boxShadow = '0 0 0';
            });

        }
    }

}

function getsettings(){
    $.ajax({
        type: "POST",
        url: "settings.php",
        data: { user: User_ID }
    })
        .done(function( msg ) {
            //msg = JSON.parse(msg);
            console.log(msg);
        });
}