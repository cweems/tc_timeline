(function(window) {
    'use strict';
    var searchQuery = ''; //Declare global variable for user's query
    var sort = 'interestingness-desc';
    $('#imageQuery').keyup(function() { //Set searchQuery to value of input field
        searchQuery = $(this).val();
        if (event.keyCode === 13) {
            $('#imageSearchButton').click();
        }
    });
    $('select').change(function() {
        sort = $('#sort').val();
        console.log(sort);
    });

    $('.search-option').click(function(){
    	sort = $(this).attr('value');
    	$(this).parent().addClass('active');
    });

    $('.flickrImage').on('click','img', function (e) {
		e.preventDefault();
		alert('Clicked!');
	});

    $('#imageSearchButton').click(function() { //Execute search when user clicks button
        $('#images').empty(); //Make #images clear in case user searches multiple times
        var cleanQuery = searchQuery.replace(/\s+/g, '+'); //Replace spaces in the query with +
        var srcLarge;
        var srcSmall;
        var picTitle;
        $.getJSON('http://api.flickr.com/services/rest/', {
            method: 'flickr.photos.search',
            api_key: '68dc576fbfc642f59fdbd1032a6c6475',
            tags: cleanQuery,
            tag_mode: 'all',
            sort: sort,
            extras: 'url_n,url_m,url_z,url_l',
            format: 'json',
            per_page: 150,
            safe_search: 1,
            nojsoncallback: 1
        }, function(data) {
            $.each(data.photos.photo, function(i, item) {
                srcSmall = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
                srcLarge = item.url_z;
                picTitle = item.title;
                console.log(srcSmall);
                $("<a data='" + srcLarge + " href='" + srcLarge + "' title='" + picTitle + "'><img src='" + srcSmall + "' alt='" + picTitle + "'/></a>").appendTo("#images");
                if (i === 19) {return false;} //Limit to 20 photos
            });
            $('#images').waitForImages(function() { //Wait for images to load before formatting them
                $('#images').justifiedGallery(); //Use justifiedGallery to make images fit together nicely
            });
        });
    });
})(window);