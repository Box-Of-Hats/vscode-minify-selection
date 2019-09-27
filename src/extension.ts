import * as vscode from "vscode";

import * as minifySelectionCommandProvider from "./minifySelectionCommandProvider";
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "extension.minifySelection.minifySelectedCss",
            () => {
                minifySelectionCommandProvider.minifySelection("css");
            }
        ),
        vscode.commands.registerCommand(
            "extension.minifySelection.minifySelectedJs",
            () => {
                minifySelectionCommandProvider.minifySelection("javascript");
            }
        )
    );
}
export function deactivate() {}
