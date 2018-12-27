var page =0;




$(document).ready(function(){    
    if ($('.allnews').size() > 0) getNews();
    $('.fancybox').fancybox();    
    placeHolder();

    if ($('.contact-form-holder').size() > 0) {
        $('.contact-form-holder').html($('.main-contact-form').html()).find('.contact-close').remove();

        $('.main-contact-form').remove();
    }
    else 
        $('.fast-contact').fadeIn();
    


});

function placeHolder() {

    $(".contactForm input[type=\"text\"],.contactForm textarea").each(function () {
        placeHold = $(this).val();
        $(this).attr("placeholder", placeHold);
        $(this).val('');
    })

}

$(document).on("click", ".contact-form-wrapper button[type='submit']", function () {

    $('.cformRes').html("<img src=\"/frontend/images/loader.gif\">");

    $.post('/' + lang + '/ajax/sendmail/1/', { name: $("#contact-name").val(), cemail: $("#contact-email").val(), text: $("#contact-message").val() }, function (data) {

        if (data.result == 1) {
            $('.cformRes').css("color", "green");
            $(".contact-form-wrapper input[type=\"text\"],.contact-form-wrapper textarea").val('');
        }
        else
            $('.cformRes').css("color", "red");

        $('.cformRes').html(data.msg);

    }, "json");

    return false;
});


$(document).on("click", ".fast-contact", function () {
    $('.main-contact-form').fadeIn();
    $('.fast-contact').hide();
});

$(document).on("click", ".contact-close", function () {
    $('.main-contact-form').hide();
    $('.fast-contact').fadeIn();
});


$(document).on("click", "#more-news", function () {

    $('.loader').html("<img src=\"/img/loader.gif\">");
    $("*[data-filter=\"*\"]").trigger("click");
    getNews();

});


function getNews()
{
    page++;    

    $.post('/' + lang + '/ajax/getnews/' + page + "/", {}, function (data) {
            $('.loader').html("");
            $('.allnews').append(data);                        
        }, "html");
        
}

$(document).on("click", ".srcBtn", function () {

    keyw = $('.search input[type="text"]').val();
    if (keyw.length > 0)  window.location = "/"+lang+"/keyword/"+keyw;


    return false;
});



