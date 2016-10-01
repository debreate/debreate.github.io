$(document).ready(function() {
    $("#faqs dd").hide();
    $("#faqs dt").click(function () {
        $(this).next("#faqs dd").slideToggle(500);
        $(this).toggleClass("expanded");
    });

    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/AntumDeluge/debreate/contributors',
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                $('#contributors').append('<div class="contributor card"><img src="' + data[index].avatar_url + '"><p><a href="' + data[index].html_url + '" class="contributor-login">' + data[index].login + '</a><br>' + data[index].contributions + ' contributions</p></div>');
            });
        }
    });
});
