import * as vscode from "vscode";

var CleanCSS = require("clean-css");
const UglifyJs = require("uglify-js");
const minifyHtml = require("html-minifier").minify;

function minifySelectedCss() {
    let textEditor = vscode.window.activeTextEditor;
    if (!textEditor) {
        vscode.window.showErrorMessage("No active text editor found.");
        return;
    }
    let selectedText = textEditor.document.getText(textEditor.selection);

    let options = {};
    let output = new CleanCSS(options).minify(selectedText);
    let minified = output.styles;

    if (minified === "") {
        vscode.window.showErrorMessage(
            `Unsupported language: ${textEditor.document.languageId}`
        );
        return;
    }

    let snippet = new vscode.SnippetString(minified);
    textEditor.insertSnippet(snippet);
}

export { minifySelectedCss };
