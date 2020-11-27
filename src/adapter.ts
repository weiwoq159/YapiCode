/*
 * @Author: 马强
 * @since: 2020-11-25 18:06:49
 * @lastTime: 2020-11-27 16:38:26
 * @LastEditors: 马强
 * @message: 
 */
import {JSONSchema4} from 'json-schema';
import {APIGroup, YAPI, API} from './types';
import * as _ from 'lodash';

export function adapter (data: any, type: 'yapi' | 'swagger') {
  switch (type) {
    case 'yapi':
      return transformYapi(data);
    case 'swagger':
      return transformYapi(data);
  }
  return [];
}
function transformYapi (data: YAPI.YAPIGroup[]): APIGroup[] {
  const groups: APIGroup[] = [];
  if (_.isArray(data)) {
    data.forEach((item) => {
      const group: APIGroup = {
        name: item.name,
        desc: item.desc,
        list: [],
      };

      item.list.forEach((i) => {
        const pathParams = i.req_params ? i.req_params.map((p) => p.name) : [];
        const queryParams = i.req_query ? i.req_query.map((p) => p.name) : [];

        let resBodySchema: JSONSchema4 | null = null;
        let reqBodySchema: JSONSchema4 | null = null;

        if (i.res_body) {
          try {
            resBodySchema = JSON.parse(i.res_body);
          } catch (e) {
            console.log('Invalid res_body');
          }
        }

        if (i.req_body_other) {
          try {
            reqBodySchema = JSON.parse(i.req_body_other);
          } catch (e) {
            console.log('Invalid req_body_other');
          }
        }

        const api: API = {
          path: i.path,
          title: i.title,
          desc: i.desc,
          method: i.method,
          pathParams,
          queryParams,
          resBody: resBodySchema,
          reqBody: reqBodySchema,
          yapi: {
            id: i._id,
          },
        };
        group.list.push(api);
      });
      groups.push(group);
    });
  }
  return groups;
}