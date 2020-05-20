var ep_align_test_helper = ep_align_test_helper || {};
ep_align_test_helper.apiUtils = {
  /**** general helper methods to handle API calls ****/
  SET_TEXT_ALIGNMENT: 'set_text_alignment',
  TEXT_ALIGNMENT_CHANGED: 'text_alignment_changed',

  lastDataSent: {},

  startListeningToApiEvents: function() {
    var self = this;
    this.resetLastDataSent();
    var outboundApiEventsTarget = helper.padChrome$.window.parent;
    outboundApiEventsTarget.addEventListener('message', function(e) {
      if (e.data.type === self.TEXT_ALIGNMENT_CHANGED) {
        self.lastDataSent[e.data.type] = e.data;
      }
    });
  },

  getLastAlignmentChange: function() {
    var align;
    var lastMessageSent = this.lastDataSent[this.TEXT_ALIGNMENT_CHANGED];
    if (lastMessageSent) {
      align = lastMessageSent.align;
    }
    return align;
  },

  waitForApiToSend: function(valueToBeSent, done) {
    var self = this;
    helper
      .waitFor(function() {
        var elementSentToApi = self.getLastAlignmentChange();
        return valueToBeSent === elementSentToApi;
      }, 4000)
      .done(done);
  },

  resetLastDataSent: function() {
    this.lastDataSent = {};
  },

  /*
    message: {
      type: 'set_text_alignment',
      align: 'center'
     }
  */

  simulateTriggerOfSetTextAlignment: function(align) {
    var message = {
      type: this.SET_TEXT_ALIGNMENT,
      align: align,
    };

    var target = helper.padChrome$.window;
    target.postMessage(message, '*');
  },
};
