import type { Context } from 'koa';
import AssistantService from '@/services/AssistantService';
import { PassThrough } from 'stream';

/**
 * 大模型交底书撰写接口 Controller
 *
 * 对应路由: /helper/disclosure/stream POST
 */
export default class HelperDisclosureStreamController {
  static async index(ctx: Context) {
    // 设置 SSE 响应头
    ctx.set('Content-Type', 'text/event-stream');
    ctx.set('Cache-Control', 'no-cache');
    ctx.set('Connection', 'keep-alive');
    // 创建一个可写流来控制响应
    const stream = new PassThrough();
    // 返回可写流
    ctx.body = stream;
    try {
      // 获取请求参数
      const params = ctx.request.body as HelperDisclosureStreamRequestParams;
      // 设置回调函数
      const onChunk = (chunk: Buffer) => stream.write(chunk.toString('utf-8'));
      // 调用服务
      await AssistantService.helperDisclosureStream(params, onChunk);
    } catch (err) {
      throw err;
    } finally {
      stream.end();
    }
  }
}
