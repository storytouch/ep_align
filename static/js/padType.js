var PAD_TYPE_URL_PARAM = 'padType';
var SCRIPT_DOCUMENT_TYPE = 'ScriptDocument';
var BACKUP_DOCUMENT_TYPE = 'BackupDocument';

exports.isScriptDocumentPad = function(paramName) {
  var params = new URL(window.location.href).searchParams;
  var padTypeParam = params.get(PAD_TYPE_URL_PARAM);
  var padTypeIsScriptDocument = padTypeParam === SCRIPT_DOCUMENT_TYPE || padTypeParam === BACKUP_DOCUMENT_TYPE;
  return padTypeIsScriptDocument;
};
