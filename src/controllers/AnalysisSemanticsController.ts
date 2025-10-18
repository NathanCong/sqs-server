import type { Context } from 'koa';
import AssistantService from '@/services/AssistantService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

export default class AnalysisSemanticsController {
  static async index(ctx: Context) {
    // 准备请求参数
    const { question } = ctx.request.body as AnalysisSemanticsRequestParams;
    try {
      const res = await AssistantService.analysisSemantics(question);
      ctx.body = formatSuccessResponse(res.data);
    } catch (error) {
      console.error(error instanceof Error ? error.message : '未知错误');
      ctx.body = formatFailureResponse(error instanceof Error ? error.message : '未知错误');
    }
  }
}
