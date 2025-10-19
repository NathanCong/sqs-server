import type { Context } from 'koa';
import AssistantService from '@/services/AssistantService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

/**
 * 语义分析接口 Controller
 *
 * 对应路由: /analysis/semantics POST
 */
export default class AnalysisSemanticsController {
  static async index(ctx: Context) {
    try {
      // 准备请求参数
      const { question } = ctx.request.body as AnalysisSemanticsRequestParams;
      // 发起请求
      const res = await AssistantService.analysisSemantics(question);
      // 返回结果
      ctx.body = formatSuccessResponse(res);
    } catch (err) {
      if (err instanceof Error) {
        ctx.body = formatFailureResponse(err.message);
      } else {
        ctx.body = formatFailureResponse('语义分析服务异常');
      }
    }
  }
}
