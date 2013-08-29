var selectedButtons = [];

var addToggleButtons = function(n) {
  for(var i = 0; i < n; ++i) {
    var button = $('<div class="toggle-button" />').hide();
    
    button.toggle( function() {
      $(this).animate({ backgroundColor: 'red' }, 'slow');
      selectedButtons.push(this);
    },
    function () {
      $(this).animate({ backgroundColor: 'green' }, 'slow');
      var index = selectedButtons.indexOf(this);
      selectedButtons.splice(index, 1);
    });

    button.hover( function() {
      $(this).animate({ borderColor: 'yellow' });
    },
    function () {
      $(this).animate({ borderColor: 'black' });
    });

    button.appendTo($('#content')).fadeIn('slow').css('display', 'inline-block');
  }
}

var removeSelected = function() {
  for(i = 0; i<selectedButtons.length; ++i) {
    var elem = selectedButtons[i];
    $(elem).animate({ width: 'hide', opacity: 'hide'}, 'slow', function () {
      $(this).remove();
    });
  }
  selectedButtons = [];
}

var removeAll = function() {
  $('.toggle-button').remove();
}

$(document).ready(function() {
  addToggleButtons(100);
  $('#rm-links').click(removeSelected);
  $('#clear-links').click(removeAll);
  $('#add-links').click(function () { addToggleButtons(10); });
  $('#content').css('background-color', '#888');
});

