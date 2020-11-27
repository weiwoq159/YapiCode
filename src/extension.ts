/*
 * @Author: 马强
 * @since: 2020-11-23 17:56:57
 * @lastTime: 2020-11-25 17:42:51
 * @LastEditors: 马强
 * @message:
 */
import * as vscode from "vscode";
import { syncFromYapi } from "./sync-yapi";
export async function activate(context: vscode.ExtensionContext) {
  
  let disposable1 = vscode.commands.registerCommand("yapi-code.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World");
  });
  /**
   * @description: get data from yapi
   * @param {*} vscode
   * @return {*}
   */
  let syncCommand = vscode.commands.registerCommand("yapi-code.linkYapi", async () => {
    (async () => {
      await syncFromYapi();
    })();
    // vscode.window.showInformationMessage("Hello nice to meet you you are Yapi");

  });
  let disposable = vscode.commands.registerCommand("yapi-code.insertCode", () => {
    vscode.window.showInformationMessage("Hello nice to meet you you are welcome");
  });
  context.subscriptions.push(syncCommand, disposable, disposable1);
}

// this method is called when your extension is deactivated
export function deactivate() {}
