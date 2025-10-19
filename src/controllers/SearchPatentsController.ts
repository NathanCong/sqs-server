import type { Context } from 'koa';
import WanXiangService from '@/services/WanXiangService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

export default class SearchPatentsController {
  static async index(ctx: Context) {
    try {
      const params = ctx.request.body as SearchPatentsRequestParams;
      const data = await WanXiangService.searchPatents(params);
      ctx.body = formatSuccessResponse(data);
    } catch (error) {
      ctx.body = formatFailureResponse(error instanceof Error ? error.message : '未知错误');
    }
  }
}
