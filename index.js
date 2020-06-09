var eejs = require('ep_etherpad-lite/node/eejs/');
var Changeset = require('ep_etherpad-lite/static/js/Changeset');

exports.eejsBlock_editbarMenuLeft = function(hook_name, args, cb) {
  args.content = args.content + eejs.require('ep_align/templates/editbarButtons.ejs');
  return cb();
};

// line, apool,attribLine,text
exports.getLineHTMLForExport = function(hook, context) {
  var alignment = _analyzeLine(context.attribLine, context.apool);
  var lineContent = context.lineContent;
  if (alignment) {
    context.lineContent = "<p style='text-align:" + alignment + "'>" + replaceGeneralTag(lineContent) + "</p>";
  }
};

function _analyzeLine(alineAttrs, apool) {
  var alignment = null;
  if (alineAttrs) {
    var opIter = Changeset.opIterator(alineAttrs);
    if (opIter.hasNext()) {
      var op = opIter.next();
      alignment = Changeset.opAttributeValue(op, 'align', apool);
    }
  }
  return alignment;
}

function replaceGeneralTag(lineContent) {
  lineContent = lineContent.replace(/<general>\*/, ''); // removes <general>*
  lineContent = lineContent.replace(/<\/general>/, ''); // removes </general>
  return lineContent;
}
