var SET_TEXT_ALIGNMENT = 'set_text_alignment';
var TEXT_ALIGNMENT_CHANGED = 'text_alignment_changed';

exports.init = function(ace) {
  // listen to outbound calls of this API
  window.addEventListener('message', function(e) {
    _handleOutboundCalls(e, ace);
  });
};

exports.triggerTextAlignmentChanged = function(align) {
  var message = {
    type: TEXT_ALIGNMENT_CHANGED,
    align: align,
  };
  _triggerEvent(message);
};

var _triggerEvent = function _triggerEvent(message) {
  // if there's a wrapper to Etherpad, send data to it; otherwise use Etherpad own window
  var target = window.parent ? window.parent : window;
  target.postMessage(message, '*');
};

var _handleOutboundCalls = function _handleOutboundCalls(e, ace) {
  if (e.data.type === SET_TEXT_ALIGNMENT) {
    var align = e.data.align;
    _applyAlignmentOnSelection(ace, align);
  }
};

var _applyAlignmentOnSelection = function(ace, align) {
  ace.callWithAce(
    function(ace) {
      ace.ace_doInsertAlign(align);
    },
    'insertalign',
    true
  );
};
