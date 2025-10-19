import type { Context } from 'koa';
import TestService from '@/services/TestService';
import { formatSuccessResponse } from '@/utils/response';

export default class TestController {
  static async index(ctx: Context) {
    const data = await TestService.index();
    ctx.body = formatSuccessResponse(data);
  }
}
