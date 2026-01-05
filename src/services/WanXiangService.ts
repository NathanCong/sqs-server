import { post, get } from '@/utils/request';

/**
 * 万象云服务
 */
export default class WanXiangService {
  /**
   * AccessToken
   */
  static accessToken = '';

  /**
   * 获取 AccessToken
   */
  static async getAccessToken(): Promise<string> {
    const requestOptions = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    const requestParams = {
      client_id: 'wxy2cb635bd4d456f33',
      client_secret: '01e0be067c2a4d69876838c02c9eeae1',
      grant_type: 'client_credentials',
    };
    try {
      const res = await post(
        'https://oauth.wanxiangyun.net/open/token',
        requestParams,
        requestOptions
      );
      const { result_code, access_token, msg } = res.data;
      // 请求失败，报错
      if (String(result_code) !== '200') {
        throw new Error(msg);
      }
      // 请求成功，返回 token
      return access_token;
    } catch (err) {
      throw err;
    }
  }

  /**
   * 专利检索 API
   */
  static async searchPatents(params: SearchPatentsRequestParams): Promise<unknown> {
    const requestOptions = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    const requestParams = { access_token: WanXiangService.accessToken, ...params };
    try {
      const res = await post(
        'https://api.wanxiangyun.net/api/db/search',
        requestParams,
        requestOptions
      );
      const { result_code, msg, data } = res.data;
      // token 失效
      if (String(result_code) === '40004') {
        WanXiangService.accessToken = await WanXiangService.getAccessToken();
        return await WanXiangService.searchPatents(params);
      }
      // 请求失败，报错
      if (String(result_code) !== '200') {
        throw new Error(msg);
      }
      // 请求成功，返回 data
      return data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * 专利详情 - 说明书 API
   */
  static async getPatentManual(params: { id: string }): Promise<unknown> {
    const requestParams = { access_token: WanXiangService.accessToken };
    try {
      const res = await get(`https://api.wanxiangyun.net/api/db/desc/${params.id}`, requestParams);
      const { result_code, msg, data } = res.data;
      // token 失效
      if (String(result_code) === '40004') {
        WanXiangService.accessToken = await WanXiangService.getAccessToken();
        return await WanXiangService.getPatentManual(params);
      }
      // 请求失败，报错
      if (String(result_code) !== '200') {
        throw new Error(msg);
      }
      // 请求成功，返回 data
      return data;
    } catch (err) {
      throw err;
    }
  }
}
