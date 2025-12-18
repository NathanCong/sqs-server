import type { Context } from 'koa';
import type { HelperDisclosureStreamRequestParams } from '@/services/AssistantService';
import AssistantService from '@/services/AssistantService';
import { PassThrough } from 'stream';

/**
 * 交底书撰写 Controller
 *
 * 对应路由: /helper/disclosure/stream POST
 */
export default class HelperDisclosureStreamController {
  static async index(ctx: Context) {
    // 设置 SSE 响应头
    ctx.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    // 创建一个可写流来控制响应
    const stream = new PassThrough();
    // 返回可写流
    ctx.body = stream;
    // 获取请求参数
    const params = ctx.request.body as HelperDisclosureStreamRequestParams;
    // 设置回调函数
    const onChunk = (chunk: Buffer) => stream.write(chunk.toString('utf-8'));
    // 发起请求
    AssistantService.helperDisclosureStream(params, onChunk).finally(() => {
      stream.end();
    });
  }
}
