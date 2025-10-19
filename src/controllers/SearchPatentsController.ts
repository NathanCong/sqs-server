import type { Context } from 'koa';
import WanXiangService from '@/services/WanXiangService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

/**
 * 检索专利接口 Controller
 *
 * 对应路由: /search/patents POST
 */
export default class SearchPatentsController {
  static async index(ctx: Context) {
    try {
      // 获取请求参数
      const params = ctx.request.body as SearchPatentsRequestParams;
      // 发起请求
      const res = await WanXiangService.searchPatents(params);
      // 返回结果
      ctx.body = formatSuccessResponse(res);
    } catch (error) {
      if (error instanceof Error) {
        ctx.body = formatFailureResponse(error.message);
      } else {
        ctx.body = formatFailureResponse('检索专利服务异常');
      }
    }
  }
}
