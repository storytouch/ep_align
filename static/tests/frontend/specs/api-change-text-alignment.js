describe('ep_align - API - chande text alignment', function() {
  var helperFunctions, apiUtils;

  before(function(done) {
    helperFunctions = ep_align_test_helper.changeTextAlignment;
    apiUtils = ep_align_test_helper.apiUtils;
    helper.newPad(function() {
      apiUtils.startListeningToApiEvents();
      done();
    });
    this.timeout(60000);
  });

  context('when API receives a message to apply a text alignment', function() {
    var lineNumber = 0;
    var alignment;

    before(function(done) {
      alignment = 'center';
      helperFunctions.selectLineAndApplyAlignment(lineNumber, alignment, done);
      this.timeout(10000);
    });

    context('and there is text selected', function() {
      it('applies the alignment on the selection', function(done) {
        helper
          .waitFor(function() {
            return helperFunctions.checkIfHasAlignment(lineNumber, alignment);
          })
          .done(done);
      });

      it('sends a message with the alignment present on the selection', function(done) {
        apiUtils.waitForApiToSend(alignment, done);
      });

      context('and user performs undo', function() {
        before(function(done) {
          helperFunctions.undo();
          done();
        });

        it('removes the alignment applied', function(done) {
          helper
            .waitFor(function() {
              return !helperFunctions.checkIfHasAlignment(lineNumber, alignment);
            })
            .done(done);
        });

        it('sends a message with the previous alignment present on the selection', function(done) {
          apiUtils.waitForApiToSend('', done);
        });

        context('and user performs redo', function() {
          before(function(done) {
            helperFunctions.redo();
            done();
          });

          it('displays the alignment previously applied', function(done) {
            helper
              .waitFor(function() {
                return helperFunctions.checkIfHasAlignment(lineNumber, alignment);
              })
              .done(done);
          });

          it('sends a message with the alignment present on the selection', function(done) {
            apiUtils.waitForApiToSend(alignment, done);
          });
        });
      });
    });
  });
});

var ep_align_test_helper = ep_align_test_helper || {};
ep_align_test_helper.changeTextAlignment = {
  undo: function() {
    ep_script_elements_test_helper.utils.undo();
  },
  redo: function() {
    ep_script_elements_test_helper.utils.redo();
  },
  checkIfHasAlignment: function(lineNumber, alignment) {
    var $targetElement = helper.padInner$('div').eq(lineNumber);
    var style = $targetElement.children().attr('style') || '';
    return style.indexOf('text-align: ' + alignment) !== -1 || style.indexOf('text-align:' + alignment) !== -1;
  },
  selectLineAndApplyAlignment: function(lineNumber, alignment, cb) {
    var self = this;
    var apiUtils = ep_align_test_helper.apiUtils;
    var $targetElement = helper.padInner$('div').eq(lineNumber);
    helper.selectLines($targetElement, $targetElement);
    apiUtils.simulateTriggerOfSetTextAlignment(alignment);
    helper
      .waitFor(function() {
        return self.checkIfHasAlignment(lineNumber, alignment);
      }, 4000)
      .done(cb);
  },
};
