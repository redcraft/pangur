'use strict';

$(document).ready(function(){

    var setEvents = function(button, background) {
        $(button)
        .mouseover(function(){$(background).stop().fadeTo(400, 1)})
        .mouseout(function(){$(background).stop().fadeTo(400, 0)});
    };
    setEvents("#about", "#about-background");
    setEvents("#portfolio", "#portfolio-background");
    setEvents("#contact", "#contact-background");
});