import * as vscode from "vscode";

import * as minifySelectionCommandProvider from "./minifySelectionCommandProvider";
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "extension.minifySelection.minifySelectedCSS",
            () => {
                minifySelectionCommandProvider.minifySelection("css");
            }
        )
    );
}
export function deactivate() {}
