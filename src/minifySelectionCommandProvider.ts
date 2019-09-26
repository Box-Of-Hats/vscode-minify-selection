import * as vscode from "vscode";

var CleanCSS = require("clean-css");
const UglifyJs = require("uglify-js");
const minifyHtml = require("html-minifier").minify;

function minifySelection() {
    let textEditor = vscode.window.activeTextEditor;
    if (!textEditor) {
        vscode.window.showErrorMessage("No active text editor found.");
        return;
    }
    let selectedText = textEditor.document.getText(textEditor.selection);

    let minified = "";

    //CSS
    switch (textEditor.document.languageId) {
        case "css":
        case "html":
            let options = {};
            let output = new CleanCSS(options).minify(selectedText);
            minified = output.styles;
            break;

        default:
            break;
    }

    if (minified === "") {
        vscode.window.showErrorMessage(
            `Unsupported language: ${textEditor.document.languageId}`
        );
        return;
    }

    let snippet = new vscode.SnippetString(minified);
    textEditor.insertSnippet(snippet);
}

export { minifySelection };
