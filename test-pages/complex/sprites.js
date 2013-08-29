
var addButton = function(name) {
  var tag = '<a href="#" class="' + name + '"></a>';
  var button = $(tag);
  button.click(function() { $('<p>'+name+' clicked</p>').appendTo('#content'); });
  button.appendTo($('#buttons'));
}

$(document).ready(function() {
  addButton('save');
  addButton('open');
  addButton('new');
  addButton('openrecent');
  addButton('setup');
  addButton('undo');
  addButton('redo');
  addButton('configure');
});

