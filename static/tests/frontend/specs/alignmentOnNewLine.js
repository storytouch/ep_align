describe('ep_align - alignment on new line', function() {
  var helperFunctions, apiUtils, utils;

  before(function(done) {
    utils = ep_align_test_helper.utils;
    helperFunctions = ep_align_test_helper.alignmentOnNewLine;
    apiUtils = ep_align_test_helper.apiUtils;

    helperFunctions.createScript(function(callback) {
      apiUtils.startListeningToApiEvents();
      done();
    });

    this.timeout(60000);
  });

  context('when user applies a alignment and a font-size on a line', function() {
    var lineNumber = 0;
    var alignment = 'right';

    before(function(done) {
      utils.applyAlignmentOnLine(lineNumber, alignment, done);
    });

    context('and creates a new line after that line', function() {
      before(function(done) {
        helperFunctions.createLineAfterLine(0, 'second line');
        helper
          .waitFor(function() {
            return helper.padInner$('div').length === 2;
          })
          .done(done);
      });

      it('applies the same alignment on the new line', function(done) {
        helper
          .waitFor(function() {
            return utils.checkIfHasAlignment(1, alignment);
          })
          .done(done);
      });
    });
  });
});

var ep_align_test_helper = ep_align_test_helper || {};
ep_align_test_helper.alignmentOnNewLine = {
  createLineAfterLine: function(targetLine, text) {
    var epSEUtils = ep_script_elements_test_helper.utils;
    var $targetLine = epSEUtils.getLine(targetLine);
    $targetLine.sendkeys('{selectall}{rightarrow}{enter}' + text);
  },
  createScript: function(cb) {
    var self = this;
    var epSEUtils = ep_script_elements_test_helper.utils;
    var SMUtils = ep_script_scene_marks_test_helper.utils;

    // mock a non-ScriptDocument pad type
    var padType = epSEUtils.TEXT_DOCUMENT_TYPE;

    epSEUtils.newPadWithType(function() {
      var firstLine = SMUtils.general('first line');
      SMUtils.createScriptWith(firstLine, 'first line', cb);
    }, padType);
  },
};
