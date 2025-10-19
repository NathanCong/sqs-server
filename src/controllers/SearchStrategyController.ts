import type { Context } from 'koa';
import AssistantService from '@/services/AssistantService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

export default class SearchStrategyController {
  static async index(ctx: Context) {
    try {
      // 准备请求参数
      const { question } = ctx.request.body as SearchStrategyRequestParams;
      // 发起请求
      const data = await AssistantService.searchStrategy(question);
      ctx.body = formatSuccessResponse(data);
    } catch (error) {
      console.error(error instanceof Error ? error.message : '未知错误');
      ctx.body = formatFailureResponse(error instanceof Error ? error.message : '未知错误');
    }
  }
}
