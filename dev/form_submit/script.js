'use strict';

$.ajax({
    url: 'dates.json',
    async: true,
    dataType: 'json',
    success: function (response){
        var dates = response;
        console.log(dates.timeline.date);
        return dates;
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

$(function(dates) {
    $('form').submit(function(dates) {
        $('#result').text(JSON.stringify($('form').serializeObject()));
        return false;

    });
});