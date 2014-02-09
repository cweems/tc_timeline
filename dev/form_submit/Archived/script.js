'use strict';

var jsonData = {};
var submission = {};

$.ajax({
    url: 'dates.json',
    async: false,
    dataType: 'json',
    success: function (response){
        jsonData = response;
    }
});

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
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
console.log(jsonData);

$(function() {
    $('form').submit(function() {
        var submission = JSON.stringify(($('form').serializeObject()));
        console.log(submission);
    });
});


/*
$(function(jsonData){
    $('form').submit(function(jsonData) {
        $('#result').text(JSON.stringify($('form').serializeObject()));
        console.log(submission)
        $.extend(true, jsonData, submission);
        return jsonData
    });
});

console.log(jsonData);*/