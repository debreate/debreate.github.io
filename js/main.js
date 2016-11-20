$(document).ready(function() {
    $('a[href*="#"]:not([href="#release-notes"])').click(function() {
        var page = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(page).offset().top }, 500);
        return false;
    });

    $.get('https://api.github.com/repos/AntumDeluge/debreate', function(data) {
        $('#github-stars').append(data['stargazers_count']);
        $('#github-forks').append(data['forks']);
    });

    $.get('https://api.github.com/repos/AntumDeluge/debreate/releases/latest', function(data) {
        var repo = 'https://github.com/AntumDeluge/debreate';
        var deb = 'debreate_' + data['name'] + '_all.deb';
        var zip = data['tag_name'] + '.zip';
        var targz = data['tag_name'] + '.tar.gz';
        $('.link-deb').attr('href', repo + '/releases/download/' + data['tag_name'] + '/' + deb).text(deb + ' (deb)');
        $('.link-zip').attr('href', repo + '/archive/' + zip).text(zip + ' (zip)');
        $('.link-targz').attr('href', repo + '/archive/' + targz).text(targz + ' (tar.gz)');
    });

    $.get('https://api.github.com/repos/AntumDeluge/debreate/contributors', function(data) {
        $.each(data, function(index, element) {
            $('#contributors-list').append('<div class="contributor card"><img src="' + data[index].avatar_url + '"><p><a href="' + data[index].html_url + '" class="contributor-login">' + data[index].login + '</a><br>' + data[index].contributions + ' contribution' + ((data[index].contributions > 1) ? 's' : '') + '</p></div>');
        });
    });

    $('#faqs dd').hide();
    $('#faqs dt').click(function() {
        $(this).next('#faqs dd').slideToggle(500);
        $(this).toggleClass('expanded');
    });
});
