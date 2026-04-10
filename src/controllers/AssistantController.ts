import type { Context } from 'koa';
import type {
  ChatStreamRequestParams,
  HelperDisclosureStreamRequestParams,
  HelperPatentRewriteStreamRequestParams,
  SearchDisclosureRequestParams,
  HelperPatentStreamRequestParams,
} from '@/services/AssistantService';
import AssistantService from '@/services/AssistantService';
import { PassThrough } from 'stream';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

/**
 * 大模型助理服务 Controller
 */
export default class AssistantController {
  /**
   * 聊天接口
   * 接口协议：POST
   * 接口路径：/assistant/chat/stream
   */
  static async chatStream(ctx: Context) {
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
    const params = ctx.request.body as ChatStreamRequestParams;
    // 设置回调函数
    const onChunk = (chunk: Buffer) => stream.write(chunk.toString('utf-8'));
    // 发起请求
    AssistantService.chatStream(params, onChunk).finally(() => {
      stream.end();
    });
  }

  /**
   * 专利交底书撰写接口
   * 接口协议：POST
   * 接口路径：/assistant/helper/disclosure/stream
   */
  static async helperDisclosureStream(ctx: Context) {
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

  /**
   * 专利改写接口
   * 接口协议：POST
   * 接口路径：/assistant/helper/patent/rewrite/stream
   */
  static async helperPatentRewriteStream(ctx: Context) {
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
    const params = ctx.request.body as HelperPatentRewriteStreamRequestParams;
    // 设置回调函数
    const onChunk = (chunk: Buffer) => stream.write(chunk.toString('utf-8'));
    // 发起请求
    AssistantService.helperPatentRewriteStream(params, onChunk).finally(() => {
      stream.end();
    });
  }

  /**
   * 交底书查新接口
   * 接口协议：POST
   * 接口路径：/assistant/search/disclosure
   */
  static async searchDisclosure(ctx: Context) {
    try {
      // 准备请求参数
      const params = ctx.request.body as SearchDisclosureRequestParams;
      // 发起请求
      const result = await AssistantService.searchDisclosure(params);
      // 返回结果
      ctx.body = formatSuccessResponse(result);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }

  /**
   * 专利撰写接口
   * 接口协议：POST
   * 接口路径：/assistant/helper/patent/stream
   */
  static async helperPatentStream(ctx: Context) {
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
    const params = ctx.request.body as HelperPatentStreamRequestParams;
    // 设置回调函数
    const onChunk = (chunk: Buffer) => stream.write(chunk.toString('utf-8'));
    // 发起请求
    AssistantService.helperPatentStream(params, onChunk).finally(() => {
      stream.end();
    });
  }
}
