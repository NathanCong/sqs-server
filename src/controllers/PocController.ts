import type { Context } from 'koa';
import type { PocParams } from '@/services/PocService';
import PocService from '@/services/PocService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

export default class PocController {
  /**
   * 用户评分
   */
  static async poc(ctx: Context) {
    try {
      // 准备请求参数
      const params = ctx.request.body as PocParams;
      // 发起请求
      await PocService.index(params);
      // 返回结果
      ctx.body = formatSuccessResponse(null);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }
}
