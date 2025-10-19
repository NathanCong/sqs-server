import type { Context } from 'koa';
import AssistantService from '@/services/AssistantService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

/**
 * 检索策略接口 Controller
 *
 * 对应路由: /search/strategy POST
 */
export default class SearchStrategyController {
  static async index(ctx: Context) {
    try {
      // 准备请求参数
      const { question } = ctx.request.body as SearchStrategyRequestParams;
      // 发起请求
      const res = await AssistantService.searchStrategy(question);
      // 返回结果
      ctx.body = formatSuccessResponse(res);
    } catch (error) {
      if (error instanceof Error) {
        ctx.body = formatFailureResponse(error.message);
      } else {
        ctx.body = formatFailureResponse('搜索策略生成服务异常');
      }
    }
  }
}
