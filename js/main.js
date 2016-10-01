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

    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/AntumDeluge/debreate',
        dataType: 'json',
        success: function(data) {
            $('#github-stars').append(data['stargazers_count']);
            $('#github-forks').append(data['forks']);
        }
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

    $('#faqs dd').hide();
    $('#faqs dt').click(function() {
        $(this).next('#faqs dd').slideToggle(500);
        $(this).toggleClass('expanded');
    });

    var appendthis = '<div class="modal-overlay js-modal-close"></div>';

    $('a[data-modal-id]').click(function(e) {
        e.preventDefault();
        $('body').append(appendthis);
        $('.modal-overlay').fadeTo(500, 0.7);
        var modalBox = $(this).attr('data-modal-id');
        $('#' + modalBox).fadeIn($(this).data());
    });


    $('.js-modal-close, .modal-overlay').click(function() {
        $('.modal-box, .modal-overlay').fadeOut(500, function() {
            $('.modal-overlay').remove();
        });
    });

    $(window).resize(function() {
        $('.modal-box').css({
            top: ($(window).height() - $('.modal-box').outerHeight()) / 2,
            left: ($(window).width() - $('.modal-box').outerWidth()) / 2
        });
    });

    $(window).resize();
});
