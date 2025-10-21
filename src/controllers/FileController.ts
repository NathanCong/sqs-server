import type { Context } from 'koa';
import FileService from '@/services/FileService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

/**
 * 文件 Controller
 */
export default class FileGenerateController {
  static async generateJson(ctx: Context) {
    try {
      // 准备请求参数
      const { jsonString } = ctx.request.body as FileGenerateRequestParams;
      // 发起请求
      const res = await FileService.generateJsonFile('./files', 'data.json', jsonString);
      // 返回结果
      ctx.body = formatSuccessResponse({ filePath: res });
    } catch (err) {
      if (err instanceof Error) {
        ctx.body = formatFailureResponse(err.message);
      } else {
        ctx.body = formatFailureResponse('JSON 文件生成服务异常');
      }
    }
  }

  static async cleanJson(ctx: Context) {
    try {
      // 发起请求
      await FileService.cleanJsonFile('./files', 'data.json');
      // 返回结果
      ctx.body = formatSuccessResponse(null);
    } catch (err) {
      if (err instanceof Error) {
        ctx.body = formatFailureResponse(err.message);
      } else {
        ctx.body = formatFailureResponse('JSON 文件删除服务异常');
      }
    }
  }

  static async readJson(ctx: Context) {
    try {
      // 发起请求
      const res = await FileService.readJsonFile('./files', 'data.json');
      // 返回结果
      ctx.body = formatSuccessResponse(res);
    } catch (err) {
      if (err instanceof Error) {
        ctx.body = formatFailureResponse(err.message);
      } else {
        ctx.body = formatFailureResponse('JSON 文件读取服务异常');
      }
    }
  }
}
