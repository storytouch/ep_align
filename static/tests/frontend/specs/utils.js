var ep_align_test_helper = ep_align_test_helper || {};
ep_align_test_helper.utils = {
  checkIfHasAlignment: function(lineNumber, alignment) {
    var $targetElement = helper.padInner$('div').eq(lineNumber);
    var style = $targetElement.children().attr('style') || '';
    return style.indexOf('text-align: ' + alignment) !== -1 || style.indexOf('text-align:' + alignment) !== -1;
  },
  selectLineAndApplyAlignment: function(lineNumber, alignment) {
    var self = this;
    var apiUtils = ep_align_test_helper.apiUtils;
    var $targetElement = helper.padInner$('div').eq(lineNumber);
    helper.selectLines($targetElement, $targetElement);
    apiUtils.simulateTriggerOfSetTextAlignment(alignment);
  },
};
