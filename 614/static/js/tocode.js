var editor = ace.edit('editor');
var JavaScriptMode = ace.require('ace/mode/javascript').Mode;
editor.session.setMode(new JavaScriptMode());
editor.setTheme('ace/theme/chrome');
editor.setShowPrintMargin(false);
editor.setReadOnly(true);

