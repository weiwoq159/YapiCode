/*
 * @Author: 马强
 * @since: 2020-11-25 14:19:51
 * @lastTime: 2020-11-25 18:33:15
 * @LastEditors: 马强
 * @message: 
 */
import * as vscode from 'vscode';
import {UserConfig} from './types';
import { getConfiguration } from './utils/vscode';
import got from 'got';
import {adapter} from './adapter';

export async function syncFromYapi() {
  const email: string = getConfiguration('yapi-code', 'email') || '';
  const url: string = getConfiguration('yapi-code', 'url') || '';
  const password: string = getConfiguration('yapi-code', 'password') || '';
  const pid: string = getConfiguration('yapi-code', 'Pid') || '';
  vscode.window.showInformationMessage(email);
  vscode.window.showInformationMessage('sync');
  if (!(email && url && password)) {
    console.error('APIViewer: Missing some configurations!');
    return [];
  }
  const payload = {
    email,
    url,
    password,
    pid
  };
  return getYapiData(payload);
}

async function getYapiData (payload: UserConfig) {
  const {email, url, password, pid} = payload;
  let groups = [];
  const response = await got(`${url}api/user/login`, {
    method: 'POST',
    json: { email, password },
  });
  const responseJson = JSON.parse(response.body);

  if (responseJson.errcode === 405) {
    console.error('APIViewer: Incorrect account or password');
    return [];
  }

  const cookies = response.headers['set-cookie']?.map((cookie) => {
    return cookie.split(';')[0];
  });
  
  const apiResponse = await got(`${url}api/plugin/export?type=json&pid=${pid}&status=all&isWiki=false`, {
    headers: {
      cookie: cookies?.join(';')
    }
  });
  try{
    const data = JSON.parse(apiResponse.body);
    groups = adapter(data, 'yapi');;
  }catch(e) {

  }
}