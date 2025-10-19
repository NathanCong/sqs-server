import { post } from '@/utils/request';

/**
 * 万象云服务
 */
export default class WanXiangService {
  static accessToken = '';

  static async getAccessToken(): Promise<void> {
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
      // 请求成功
      if (String(result_code) === '200') {
        WanXiangService.accessToken = access_token;
        return;
      }
      // 请求有错误
      throw new Error(msg);
    } catch (error) {
      throw error;
    }
  }

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
        await WanXiangService.getAccessToken();
        return await WanXiangService.searchPatents(params);
      }
      // 请求成功
      if (String(result_code) === '200') {
        return data;
      }
      // 其他错误
      throw new Error(msg);
    } catch (error) {
      throw error;
    }
  }
}
