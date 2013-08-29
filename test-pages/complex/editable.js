
$(document).ready(function() {
    var editorElement = document.getElementById('editable');
    editorElement.contentEditable = true;

    $('#underline-ctrl').click( function() {
        editorElement.focus();
        document.execCommand('underline', false, null);
    });
}); 
