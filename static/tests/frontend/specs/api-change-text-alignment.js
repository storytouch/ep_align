describe('ep_align - API - chande text alignment', function() {
  var helperFunctions, apiUtils, utils, epSEUtils;

  before(function(done) {
    utils = ep_align_test_helper.utils;
    helperFunctions = ep_align_test_helper.changeTextAlignment;
    apiUtils = ep_align_test_helper.apiUtils;
    epSEUtils = ep_script_elements_test_helper.utils;

    // mock a non-ScriptDocument pad type
    epSEUtils.setPadType('ANY_TYPE');

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
      utils.selectLineAndApplyAlignment(lineNumber, alignment);
      done();
    });

    context('and there is text selected', function() {
      it('applies the alignment on the selection', function(done) {
        helper
          .waitFor(function() {
            return utils.checkIfHasAlignment(lineNumber, alignment);
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
              return !utils.checkIfHasAlignment(lineNumber, alignment);
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
                return utils.checkIfHasAlignment(lineNumber, alignment);
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
};
