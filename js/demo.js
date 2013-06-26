/*
 * blueimp Gallery Demo JS 2.0.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global window, document, blueimp, $ */

$(function () {
    'use strict';

    var linksContainer = $('#links').on('click', 'a', function (event) {
        // Show the Gallery as lightbox when selecting a link,
        // starting with the selected image:
        if (blueimp.Gallery(linksContainer.find('a'), {
                index: $(this).data('index')
            })) {
            // Prevent the default link action on
            // successful Gallery initialization:
            event.preventDefault();
        }
    });

    // Load demo images from flickr:
    $.ajax({
        url: 'http://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.interestingness.getList',
            api_key: '7617adae70159d09ba78cfec73c13be3'
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (result) {
        var baseUrl,
            carouselLinks = [];
        // Add the demo images as links with thumbnails to the page:
        $.each(result.photos.photo, function (index, photo) {
            baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                photo.server + '/' + photo.id + '_' + photo.secret;
            $('<a/>')
                .append($('<img>').prop('src', baseUrl + '_s.jpg'))
                .prop('href', baseUrl + '_b.jpg')
                .prop('title', photo.title)
                .data('index', index)
                .appendTo(linksContainer);
            carouselLinks.push({
                href: baseUrl + '_c.jpg',
                title: photo.title
            });
        });
        // Initialize the Gallery as image carousel:
        blueimp.Gallery(carouselLinks, {
            containerId: 'blueimp-image-carousel',
            carousel: true
        });
    });

    // Initialize the Gallery as video carousel:
    blueimp.Gallery([
        {
            title: 'Sintel',
            href: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
            type: 'video/mp4',
            poster: 'http://media.w3.org/2010/05/sintel/poster.png'
        },
        {
            title: 'Big Buck Bunny',
            href: 'http://upload.wikimedia.org/wikipedia/commons/7/75/Big_Buck_Bunny_Trailer_400p.ogg',
            type: 'video/ogg',
            poster: 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Big.Buck.Bunny.-.Opening.Screen.png/800px-Big.Buck.Bunny.-.Opening.Screen.png'
        },
        {
            title: 'Elephants Dream',
            href: 'http://upload.wikimedia.org/wikipedia/commons/transcoded/8/83/Elephants_Dream_%28high_quality%29.ogv/Elephants_Dream_%28high_quality%29.ogv.360p.webm',
            type: 'video/webm',
            poster: 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg'
        }
    ], {
        containerId: 'blueimp-video-carousel',
        carousel: true
    });

});
