/**
 *  Loading defaults at the start of the page
 */

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

$( document ).ready(function() {

    //jquery ui tooltip
    //$( document ).tooltip();

    $('#messageForm').on('submit', function(e) {
        e.preventDefault();

        console.log('Button clicked');
        //serializeObject turns into { hello : 'world' }
        //JSON.stringify turns into { "hello" : "world" }
        var formData = JSON.stringify($('form').serializeObject());
        console.log(formData);

        $.ajax({
            url: '/message',
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            timeout: 5000,
            dataType: 'jsonp',
            jsonpCallback: "messageCB",
            data: formData, //send the json object

            /*
            complete: function() {
                console.log('process complete');
            },
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));

                //Need to do something with data
                //var jData = $.parseJSON(data);
                //alert(jData.message);
                alert(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            },*/
        })
        .done(function(data) {
            var jdata = JSON.parse(data);
            alert('Server Reponse, echoing back: \n\n' + jdata.message);
        });
    });

});
