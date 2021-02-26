var utils = require('./utils');

var ENTER = 13;

var alignmentOnNewLineHandler = function(editorInfo, documentAttributeManager, rep) {
  this._editorInfo = editorInfo;
  this._attributeManager = documentAttributeManager;
  this._rep = rep;
  this._isKeyDownEmitterBrowser = browser.msie || browser.safari || browser.chrome; // cache this checking
};

alignmentOnNewLineHandler.prototype.processAceKeyEvent = function(context) {
  var evt = context.evt;
  var enterPressed = this._shortcutPressed(evt, ENTER);
  if (enterPressed) {
    this._setAlignmentOnNewLine();
  }
};

alignmentOnNewLineHandler.prototype._setAlignmentOnNewLine = function() {
  var self = this;
  var newLineNumber = self._editorInfo.ace_caretLine();
  var previousLineAlignment = self._getAlignmentOfPreviousLine(newLineNumber);
  if (previousLineAlignment) {
    self._editorInfo.ace_inCallStackIfNecessary('setAlignment', function() {
      self._attributeManager.setAttributeOnLine(newLineNumber, 'align', previousLineAlignment);
    });
  }
};

alignmentOnNewLineHandler.prototype._getAlignmentOfPreviousLine = function(lineNumber) {
  var previousLineNumber = lineNumber - 1;
  if (previousLineNumber >= 0) {
    return this._attributeManager.getAttributeOnLine(previousLineNumber, 'align');
  }
  return null;
};

alignmentOnNewLineHandler.prototype._shortcutPressed = function(evt, shortcut) {
  var type = evt.type;
  var keyCode = evt.keyCode;
  var shortcutWasPressed = keyCode == shortcut && this._isTypeForSpecialKey(type);
  return shortcutWasPressed;
};

alignmentOnNewLineHandler.prototype._isTypeForSpecialKey = function(type) {
  return this._isKeyDownEmitterBrowser ? type == 'keydown' : type == 'keypress';
};

exports.init = function() {
  var editorInfo = this.editorInfo;
  var documentAttributeManager = this.documentAttributeManager;
  var rep = this.rep;

  return new alignmentOnNewLineHandler(editorInfo, documentAttributeManager, rep);
};
