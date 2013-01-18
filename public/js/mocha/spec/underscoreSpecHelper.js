(function(){
  // Unmap the function we're asking the user to implement
  _.each = _.forEach = undefined;

  // If the user provides a leading var keyword, we need to strip it before
  // we eval their code; otherwise, it won't be executed in the correct context
  var editorContents = parent.xeditor1.getValue();
  editorContents = editorContents.replace(/^var /g, '');

  // Here be eval dragons
  _.each = each = eval(editorContents);

  if(!_.each){
    if(!window.each){
      throw new Error('You must define an each function either in the underscore namespace or in the global scope');
    }
    _.each = window.each;
  }
})();