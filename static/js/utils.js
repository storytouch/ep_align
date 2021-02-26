exports.getPluginProps = function() {
  pad.plugins = pad.plugins || {};
  pad.plugins.ep_align = pad.plugins.ep_align || {};
  return pad.plugins.ep_align;
};

// If the pad is a ScriptDocument, alignment is disabled
exports.isAlignmentEnabledOnThisPadType = function() {
  var isScriptDocumentPad = pad.plugins.ep_script_elements.padType.isScriptDocumentPad();
  return !isScriptDocumentPad;
}
