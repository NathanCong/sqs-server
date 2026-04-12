import type { Context } from 'koa';
import type {
  SearchPatentsRequestParams,
  SearchPatentsResponseData,
} from '@/services/WanXiangService';
import WanXiangService from '@/services/WanXiangService';
import { formatSuccessResponse, formatFailureResponse } from '@/utils/response';

/**
 * 万象云服务 Controller
 */
export default class WanXiangController {
  /**
   * 检索专利 API
   */
  static async searchPatents(ctx: Context) {
    try {
      // 获取请求参数
      const params = ctx.request.body as SearchPatentsRequestParams;
      // 发起请求
      const res = await WanXiangService.searchPatents(params);
      const { patents, total_count } = res as SearchPatentsResponseData;
      // 返回结果
      ctx.body = formatSuccessResponse({
        total: total_count,
        pageSize: patents.length,
        list: patents,
      });
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }

  /**
   * 专利详情 - 基本信息 API
   */
  static async getPatentBasicInfo(ctx: Context) {
    try {
      // 准备请求参数
      const params = ctx.query as { id: string };
      // 发起请求
      const res = await WanXiangService.getPatentBasicInfo(params);
      // 返回结果
      ctx.body = formatSuccessResponse(res);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }

  /**
   * 专利详情 - 说明书 API
   */
  static async getPatentDesc(ctx: Context) {
    try {
      // 准备请求参数
      const params = ctx.query as { id: string };
      // 发起请求
      const res = await WanXiangService.getPatentDesc(params);
      // 返回结果
      ctx.body = formatSuccessResponse(res);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }

  /**
   * 专利详情 - 权利要求 API
   */
  static async getPatentClaim(ctx: Context) {
    try {
      // 准备请求参数
      const params = ctx.query as { id: string };
      // 发起请求
      const res = await WanXiangService.getPatentClaim(params);
      // 返回结果
      ctx.body = formatSuccessResponse(res);
    } catch (err) {
      ctx.body = formatFailureResponse(err instanceof Error ? err.message : '未知错误');
    }
  }
}
