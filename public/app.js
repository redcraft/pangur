'use strict';


$(document).ready(function(){

    var PageController = function() {

        var PORTFOLIO_PAGE_ID = "portfolio";
        var currentPageId = undefined;
        var currentStoryId = undefined;

        var getPage = function (id) {
            return {
                id: id,
                buttonId: "#" + id + "-button",
                backgroundId: "#" + id + "-background",
                pageId: "#" + id
            };
        };

        var showPage = function (page, skipHistory) {
            if(!!currentPageId && currentPageId != page.id) {
                hidePageById(currentPageId, true);
            }
            if(!!currentStoryId) {
                hideStory(currentStoryId, true);
            }

            $(page.backgroundId).css("opacity", 1);
            $("header").addClass("header-rise");
            $(page.pageId).show('slide', {direction: 'down'}, 500);

            if(!skipHistory) {
                window.history.pushState('', '', '/' + page.id + '/');
            }

            currentPageId = page.id;
        };

        var hidePage = function (page, skipHistory) {
            if(!!currentStoryId) {
                hideStory(currentStoryId, true);
            }

            $("header").removeClass("header-rise");
            $(page.pageId).hide('slide', {direction: 'down'});
            $(page.backgroundId).css("opacity", 0);

            if(!skipHistory) {
                window.history.pushState('', '', '/');
            }

            currentPageId = undefined;
        };

        var showPageById = function(id, skipHistory) {
            showPage(getPage(id), skipHistory);
        };

        var hidePageById = function(id, skipHistory) {
            hidePage(getPage(id), skipHistory);
        };

        var showStory = function(storyId, skipHistory) {
            console.log(storyId);
            if(!!currentStoryId) {
                hideStory(currentStoryId, true);
            }
            if(!currentPageId) {
                showPageById(PORTFOLIO_PAGE_ID, true);
            }

            $('#' + storyId).show('slide', {direction: 'right'});

            if(!skipHistory) {
                window.history.pushState('', '', '/' + PORTFOLIO_PAGE_ID + '/' + storyId + '/');
            }

            currentStoryId = storyId;
        };

        var hideStory = function(storyId, skipHistory) {
            $('#' + storyId).hide('slide', {direction: 'right'});

            if(!skipHistory) {
                var path = '/' + PORTFOLIO_PAGE_ID + '/';
                window.history.pushState('', '', path);
            }
        };

        var restorePage = function(path){
            console.log(path);
            var segments = [];
            path.split('/').forEach(function(segment) {
                if(segment.length > 0) {
                    segments.push(segment);
                }
            });
            switch(segments.length) {
                case 0 : {
                    hideAll(true);
                    break;
                }
                case 1 : {
                    showPageById(segments[0], true);
                    break;
                }
                case 2 : {
                    pageController.showStory(segments[1], true);
                    break;
                }
            }
        };

        var hideAll = function (skipHistory) {
            hidePageById(currentPageId, skipHistory);
        };

        return {

            getPage : getPage,
            showPage : showPage,
            hidePage : hidePage,
            hideAll : hideAll,
            showStory : showStory,
            hideStory : hideStory,
            restorePages : restorePage,
            isOpen : function() {
                return currentPageId != undefined;
            }
        }
    };

    var pageController = new PageController();

    $('.page').each(function() {
        var page = pageController.getPage($(this).attr('id'));
        $(page.buttonId)
            .mouseover(function(){if(!pageController.isOpen())$(page.backgroundId).stop().fadeTo(400, 1)})
            .mouseout(function(){if(!pageController.isOpen())$(page.backgroundId).stop().fadeTo(400, 0)})
            .click(function() {
                pageController.showPage(page);
            }
        );
        $(page.pageId).find(".pangur-thin-arrow-down").click(function() {
            pageController.hidePage(page);
        });
    });

    $(".project").each(function() {
        var project = $(this);
        var story = project.find('.project-story');
        project.find('.story-link').click(function() {
            pageController.showStory(story.attr('id'));
        });
        story.find('.back-to-portfolio').click(function() {
            pageController.hideStory(story.attr('id'));
        });
    });

    $('#designer-info').click(function() {
        pageController.hideAll();
    });

    window.onpopstate = function() {
        pageController.restorePages(window.location.pathname);
    };

    $('.osx-window').osxWindow();

    $('#form-submit').click(function() {
        $('#contact-form').ajaxSubmit(function() {
            $("input, textarea").val("");
            $('#form-success').css('opacity', 1);
			setTimeout(function() {
				$('#form-success').css('opacity', 0);
			}, 3000);
        });
    });

    setTimeout(function() {
        $('#portfolio').find("article").each(function() {
            var unslider = $(this).find(".banner").unslider({dots: true, autoplay: false});
            //unslider.css('height', '555px');
            $(this).find(".slide-button").click(function() {
                var fn = this.className.split(' ')[1];
                unslider.data('unslider')[fn]();
            });
        });
    }, 300);

    setTimeout(function() {
        pageController.restorePages(window.location.pathname);
    }, 500);






});