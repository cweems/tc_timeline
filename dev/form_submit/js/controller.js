'use strict';
angular.module('formApp', []);

var searchQuery = "exam";


$( "#imageQuery" )
  .keyup(function() {
    searchQuery = $( this ).val();
    $( "p" ).text( searchQuery );
  })
  .keyup();


$("#imageSearchButton").click(function($scope){ //Execute search when user clicks button
	
	var cleanQuery = searchQuery.replace(/\s+/g, '+'); //Replace spaces in the query with +
	var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=68dc576fbfc642f59fdbd1032a6c6475&tags="+cleanQuery+"&safe_search=1&per_page=20"; //URL for API call
	console.log(cleanQuery);
	var src;
	$.getJSON(url + "&format=json&jsoncallback=?", function(data){
	    $.each(data.photos.photo, function(i,item){ 
			src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
			$("<img class='flickrImage'/>").attr("src", src).appendTo("#images");
			if ( i === 19 ) return false;
	    });
	});
});