$( document ).ready(function() {
    
    var eHash = $.md5(process.env.EMAIL_ADDRESS);
    
    $( ".front" ).html(
        "<img src='http://www.gravatar.com/avatar/" + 
        eHash + "' />");
});//end of jquery