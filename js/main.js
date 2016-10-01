$(document).ready(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $("#faqs dd").hide();
    $("#faqs dt").click(function() {
        $(this).next("#faqs dd").slideToggle(500);
        $(this).toggleClass("expanded");
    });

    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/AntumDeluge/debreate/contributors',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, element) {
                $('#contributors').append('<div class="contributor card"><img src="' + data[index].avatar_url + '"><p><a href="' + data[index].html_url + '" class="contributor-login">' + data[index].login + '</a><br>' + data[index].contributions + ' contribution' + ((data[index].contributions > 1) ? 's' : '') + '</p></div>');
            });
        }
    });
});
