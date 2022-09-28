import * as vscode from 'vscode';
import { javaDtoToTypeScriptInterface } from './utils';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('to-typescript-interface.toTypeScript', () => {
		// The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    };

    const document = editor.document;

    try {
      editor?.edit(editBuilder => {
        editor?.selections.forEach((selection) => {
          const range = selection.isEmpty ? document.getWordRangeAtPosition(selection.start) || selection : selection;
          const selectedText = document.getText(range);

          if (!selectedText) {
            vscode.window.showWarningMessage('Please select the content first');
            return;
          }

          try {
            const result = javaDtoToTypeScriptInterface(selectedText);
            if (result) {
              editBuilder.replace(range, result);
            }
          } catch (error: any) {
            console.error(error);
            vscode.window.showErrorMessage(error?.message);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}


