'use strict';

var searchQuery = ''; //Declare global variable for our user's query
var sort = '';

$('#imageQuery').keyup(function() { //Set searchQuery to value of input field
    searchQuery = $(this).val();
    if(event.keyCode === 13){
		$('#imageSearchButton').click();
    }
    $('#queryResult').text(searchQuery);
});

$('select').change(function(){
	sort = $('#sort').val();
	console.log(sort);
});

$('#imageSearchButton').click(function(){ //Execute search when user clicks button
	$('#images').empty(); //Make sure #images gets cleared in case user searches multiple times 
	var cleanQuery = searchQuery.replace(/\s+/g, '+'); //Replace spaces in the query with +
	console.log(cleanQuery);
	var srcLarge;
	var srcMedium
	$.getJSON('http://api.flickr.com/services/rest/',{
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
	}, 
		function(data){
	    $.each(data.photos.photo, function(i,item){
			srcLarge = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id +"_"+ item.secret +"_m.jpg";
			srcMedium = item.url_z;
			console.log(srcMedium);
			$("<a id='imageLink' href='" + srcLarge + "''><img class='flickrImage' src='" + srcMedium + "'/></a>").appendTo("#images");
			if ( i === 19 ) return false; //Limit to 20 photos

		});
	});
});

$('#formatImg').click(function(){
	$("#images").justifiedGallery();
})

$('.flickrImage').on('click', 'img', function(e){
	e.preventDefault();
	var imageLink = $(this).attr('src');
	console.log('clicked!');
})