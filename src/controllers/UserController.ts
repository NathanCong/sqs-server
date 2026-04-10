import type { Context } from 'koa';
import type {
  RegisterParams,
  LoginParams,
  PocParams,
  UpdateUserInfoParams,
} from '@/services/UserService';
import UserService from '@/services/UserService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

export default class UserController {
  /**
   * 用户 - 注册
   */
  static async register(ctx: Context) {
    try {
      // 准备请求参数
      const { userName, userPhone, userEmail, userPassword } = ctx.request.body as RegisterParams;
      // 发起请求
      await UserService.register({ userName, userPhone, userEmail, userPassword });
      // 返回结果
      ctx.body = formatSuccessResponse(null);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }

  /**
   * 用户 - 登录
   */
  static async login(ctx: Context) {
    try {
      // 准备请求参数
      const { userEmail, userPassword } = ctx.request.body as LoginParams;
      // 发起请求
      const accessToken = await UserService.login({ userEmail, userPassword });
      // 返回结果
      ctx.body = formatSuccessResponse({ accessToken });
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }

  /**
   * 用户 - 评分
   */
  static async poc(ctx: Context) {
    try {
      // 准备请求参数
      const params = ctx.request.body as PocParams;
      // 发起请求
      await UserService.poc(params);
      // 返回结果
      ctx.body = formatSuccessResponse(null);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }

  /**
   * 用户 - 获取个人信息
   */
  static async getUserInfo(ctx: Context) {
    try {
      // 准备请求参数
      const userEmail = ctx.query.userEmail as string;
      // 发起请求
      const userInfo = await UserService.getUserInfo({ userEmail });
      // 返回结果
      ctx.body = formatSuccessResponse(userInfo);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }

  /**
   * 用户 - 更新个人信息
   */
  static async updateUserInfo(ctx: Context) {
    try {
      // 准备请求参数
      const { userEmail, userName, userPhone, userPassword } = ctx.request
        .body as UpdateUserInfoParams;
      // 发起请求
      await UserService.updateUserInfo({ userEmail, userName, userPhone, userPassword });
      // 返回结果
      ctx.body = formatSuccessResponse(null);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }
}
