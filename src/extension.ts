/*
 * @Author: 马强
 * @since: 2020-11-23 17:56:57
 * @lastTime: 2020-11-25 10:26:03
 * @LastEditors: 马强
 * @message: 
 */
import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {

	
	let disposable1 = vscode.commands.registerCommand('yapi-code.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World');
  });
  let disposable = vscode.commands.registerCommand('yapi-code.insertCode', () => {
		vscode.window.showInformationMessage('Hello nice to meet you you are welcome');
	});
	context.subscriptions.push(disposable, disposable1);
}

// this method is called when your extension is deactivated
export function deactivate() {}
