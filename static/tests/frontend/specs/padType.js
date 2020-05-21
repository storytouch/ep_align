describe('ep_align - pad type', function() {
  var helperFunctions, apiUtils, utils, epSEUtils;

  before(function(done) {
    utils = ep_align_test_helper.utils;
    apiUtils = ep_align_test_helper.apiUtils;
    epSEUtils = ep_script_elements_test_helper.utils;
    helperFunctions = ep_align_test_helper.padType;
    done();
  });

  context('when the pad type is a ScriptDocument', function() {
    before(function(done) {
      helperFunctions.createPadWithType(epSEUtils.SCRIPT_DOCUMENT_TYPE, done);
      this.timeout(60000);
    });

    context('and the API receives a message to apply a text alignment', function() {
      var lineNumber = 0;
      var alignment;

      before(function(done) {
        alignment = 'center';
        utils.selectLineAndApplyAlignment(lineNumber, alignment);
        done();
      });

      it('does not apply the alignment on the selection', function(done) {
        helper
          .waitFor(function() {
            return !utils.checkIfHasAlignment(lineNumber, alignment);
          })
          .done(done);
      });
    });
  });

  context('when the pad type is not a ScriptDocument', function() {
    var ANY_TYPE = 'ANY_TYPE';

    before(function(done) {
      helperFunctions.createPadWithType(ANY_TYPE, done);
      this.timeout(60000);
    });

    context('and the API receives a message to apply a text alignment', function() {
      var lineNumber = 0;
      var alignment;

      before(function(done) {
        alignment = 'center';
        utils.selectLineAndApplyAlignment(lineNumber, alignment);
        done();
      });

      it('applies the alignment on the selection', function(done) {
        helper
          .waitFor(function() {
            return utils.checkIfHasAlignment(lineNumber, alignment);
          })
          .done(done);
      });
    });
  });
});

var ep_align_test_helper = ep_align_test_helper || {};
ep_align_test_helper.padType = {
  getPadTypeParamMocked: function(type) {
    return function() {
      return type;
    };
  },
  createPadWithType: function(padType, cb) {
    var self = this;
    var apiUtils = ep_align_test_helper.apiUtils;
    var epSEUtils = ep_script_elements_test_helper.utils;

    // mock the pad type
    epSEUtils.setPadType(padType);

    helper.newPad(function() {
      // line needs to have some text on it
      apiUtils.startListeningToApiEvents();

      helper.waitFor(function(){
        var lineNumber = helper.padInner$("div").length;
        return lineNumber === 1;
      }).done(cb);

      cb();
    });
  },
  isMouseWindowVisible: function() {
    var outer$ = helper.padOuter$;
    if (!outer$) return false;
    var $mouseWindow = outer$('.mouseWindow');
    var isMouseWindowVisible = $mouseWindow.filter('.visible').length === 1;
    return isMouseWindowVisible;
  },
};
