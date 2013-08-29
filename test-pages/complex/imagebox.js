
var innerbox = undefined;
var numOfPages = 0;
var currPage = 0;

var addImagePage = function(img, blaablaa) {
    var newImagePage = $('<div class="imagebox-page" />');

    var newImage = $('<img src="' + img + '" />');
    newImage.appendTo(newImagePage);

    var newParagraph = $('<p>' + blaablaa + '</p>');
    newParagraph.appendTo(newImagePage);

    newImagePage.appendTo($('#inner-imagebox'));
    numOfPages += 1;
    $('#inner-imagebox').css('width', numOfPages*600);
};

$(document).ready(function() {
    addImagePage('1.png', 'The first page of the image box');
    addImagePage('2.png', 'The second page of the image box');
    addImagePage('3.png', 'The third and the last page of the image box'); 

    $('#next-button').click( function () {
        currPage += 1;
        if(!(numOfPages > currPage)) currPage = 0;
        $('#inner-imagebox').animate({left: -currPage * 600});
    });

    $('#prev-button').click( function () {
        currPage -= 1;
        if(currPage < 0) currPage = numOfPages-1;
        $('#inner-imagebox').animate({left: -currPage * 600});
    });
});

