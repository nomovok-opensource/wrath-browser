
function getUnicodeStr(chr) {
    if(chr > 0xFFFF) {
        chr -= 0x10000;
        return String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
    } else {
        return String.fromCharCode(chr);
    }
}

function generateText(start, end) {
    var s = '';
    for(var i = start; i <= end; ++i)
    {
        if(i % 50 == 25)
            s = s + ' '; // Insert a whitespace to allow text wrapping
        s = s + getUnicodeStr(i);
    }
    return s;
}

$(document).ready(function() {
    $('#addbutton').click( function () {
        var start = $('input[name=start]').val();
        var end = $('input[name=end]').val();
        start = parseInt(start);
        end = parseInt(end);
        if(end < start) return;
        var theDiv = $('<div class="textblock"></div>');
        var hdr = $('<h1>' + start + ' - ' + end + '</h1>');
        var rmButton = $('<a href="#"> remove this </a>');
        rmButton.click(function () { theDiv.remove(); });
        var text = generateText(start, end);
        var para = $('<p>'+text+'</p>');
        rmButton.appendTo(hdr);
        hdr.appendTo(theDiv);
        para.appendTo(theDiv);
        theDiv.appendTo($('#content'));
    });
});
