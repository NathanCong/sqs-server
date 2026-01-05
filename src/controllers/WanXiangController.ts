import type { Context } from 'koa';
import WanXiangService from '@/services/WanXiangService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

/**
 * 万象云接口 Controller
 */
export default class WanXiangController {
  /**
   * 专利详情 - 说明书 API
   */
  static async getPatentManual(ctx: Context) {
    try {
      // 准备请求参数
      const params = ctx.request.body as { id: string };
      // 发起请求
      const res = await WanXiangService.getPatentManual(params);
      // 返回结果
      ctx.body = formatSuccessResponse(res);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }
}
