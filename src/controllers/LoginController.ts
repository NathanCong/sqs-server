import type { Context } from 'koa';
import type { RegisterParams, LoginParams } from '@/services/LoginService';
import LoginService from '@/services/LoginService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

export default class LoginController {
  /**
   * 新用户注册
   */
  static async register(ctx: Context) {
    try {
      // 准备请求参数
      const { userName, userPhone, userEmail, userPassword } = ctx.request.body as RegisterParams;
      // 发起请求
      await LoginService.register({ userName, userPhone, userEmail, userPassword });
      // 返回结果
      ctx.body = formatSuccessResponse(null);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }

  /**
   * 老用户登录
   */
  static async login(ctx: Context) {
    try {
      // 准备请求参数
      const { userEmail, userPassword } = ctx.request.body as LoginParams;
      // 发起请求
      const accessToken = await LoginService.login({ userEmail, userPassword });
      // 返回结果
      ctx.body = formatSuccessResponse({ accessToken });
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }
}
