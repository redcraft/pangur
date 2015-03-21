'use strict';

$(document).ready(function(){

    var setEvents = function(id) {
        var buttonId = "#" + id + "-button";
        var backgroundId = "#" + id + "-background";
        var pageId = "#" + id + "-page";
        var active = false;
        $(buttonId)
            .mouseover(function(){if(!active)$(backgroundId).stop().fadeTo(400, 1)})
            .mouseout(function(){if(!active)$(backgroundId).stop().fadeTo(400, 0)})
            .click(function() {
                    active = true;
                    $(backgroundId).css("opacity", 1);
                    $("header").addClass("header-rise");
                    $(pageId).show('slide', {direction: 'down'}, 500);
                    $(pageId).find(".pangur-thin-arrow-down").click(function() {
                        active = false;
                        $("header").removeClass("header-rise");
                        $(pageId).hide('slide', {direction: 'down'});
                        $(backgroundId).css("opacity", 0);
                    });
            }
        );
    };
    setEvents("about");
    setEvents("portfolio");
    setEvents("contact");

    $('.osx-window').osxWindow();

    $('#portfolio-page').find("article").each(function() {
        var unslider = $(this).find(".banner").unslider({dots: true, autoplay: false});
        $(this).find(".slide-button").click(function() {
            var fn = this.className.split(' ')[1];
            unslider.data('unslider')[fn]();
        });
    });

});