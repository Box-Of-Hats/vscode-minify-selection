import * as vscode from "vscode";

var CleanCSS = require("clean-css");
const UglifyJs = require("uglify-js");

function minifySelection(language: string) {
    let textEditor = vscode.window.activeTextEditor;
    if (!textEditor) {
        vscode.window.showErrorMessage("No active text editor found.");
        return;
    }
    let selectedText = textEditor.document.getText(textEditor.selection);
    let minified = "";
    let options = {};
    switch (language) {
        case "css":
            options = {};
            let output = new CleanCSS(options).minify(selectedText);
            minified = output.styles;
            break;

        case "javascript":
            var minifyResult = UglifyJs.minify(selectedText);
            if (minifyResult.error) {
                vscode.window.showErrorMessage(
                    `Could not minify JS: ${minifyResult.error}`
                );
                return;
            }

            minified = minifyResult.code;
            break;

        default:
            vscode.window.showErrorMessage(`Unsupported language: ${language}`);
            return;
    }

    if (minified === "") {
        vscode.window.showErrorMessage(`Could not minify selection`);
    }

    let snippet = new vscode.SnippetString(minified);
    textEditor.insertSnippet(snippet);
}

export { minifySelection };
