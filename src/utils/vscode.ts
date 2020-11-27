/*
 * @Author: 马强
 * @since: 2020-11-25 13:59:43
 * @lastTime: 2020-11-25 14:02:22
 * @LastEditors: 马强
 * @message: 
 */
import * as vscode from 'vscode';

export function getConfiguration<T>(section: string, key: string) {
  return vscode.workspace.getConfiguration(section).get<T>(key);
}