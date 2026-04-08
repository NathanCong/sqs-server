import type { Context } from 'koa';
import type { SearchDisclosureRequestParams } from '@/services/AssistantService';
import AssistantService from '@/services/AssistantService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

/**
 * 交底书查新接口 Controller
 *
 * 对应路由: /search/disclosure POST
 */
export default class SearchDisclosureController {
  static async index(ctx: Context) {
    try {
      // 获取请求参数
      const params = ctx.request.body as SearchDisclosureRequestParams;
      // 发起请求
      const res = await AssistantService.searchDisclosure(params);
      // 返回结果
      ctx.body = formatSuccessResponse(res);
    } catch (err) {
      if (err instanceof Error) {
        ctx.body = formatFailureResponse(err.message);
      } else {
        ctx.body = formatFailureResponse('交底书查新服务异常');
      }
    }
  }
}
