import { postForStream, post } from '@/utils/request';
import WanXiangService from './WanXiangService';

/**
 * 大模型助理服务
 */
export default class AssistantService {
  /**
   * 提问服务
   */
  static async consultStream(params: ConsultStreamRequestParams, onChunk: (chunk: Buffer) => void) {
    // try {
    //   // 发起请求
    //   const res = await postForStream('/Service/disclosure/stream', params);
    //   // 获取数据
    //   const { data } = res;
    //   // 设置监听
    //   data.on('data', (chunk: Buffer) => onChunk(chunk));
    //   data.on('end', () => {});
    //   data.on('error', (err: Error) => {
    //     throw err.message;
    //   });
    // } catch (err) {
    //   throw err;
    // }
    return new Promise((resolve, reject) => {
      WanXiangService.getAccessToken()
        .then(access_token => {
          postForStream('/Agent/chart/stream', { ...params, access_token })
            .then(res => {
              res.data.on('data', (chunk: Buffer) => onChunk(chunk));
              res.data.on('end', () => resolve(null));
              res.data.on('error', (err: Error) => reject(err));
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * 语义分析服务
   */
  static async analysisSemantics(question: string) {
    try {
      const res = await post('/intent/classify', { question });
      const { ok, result } = res.data;
      if (ok) {
        return result;
      }
      throw new Error('语义分析服务异常');
    } catch (err) {
      throw err;
    }
  }

  /**
   * 技术交底书撰写服务
   */
  static async helperDisclosureStream(
    params: HelperDisclosureStreamRequestParams,
    onChunk: (chunk: Buffer) => void
  ): Promise<void> {
    // try {
    //   // 发起请求
    //   const res = await postForStream('/Service/disclosure/stream', params);
    //   // 获取数据
    //   const { data } = res;
    //   // 设置监听
    //   data.on('data', (chunk: Buffer) => onChunk(chunk));
    //   data.on('end', () => {});
    //   data.on('error', (err: Error) => {
    //     throw err.message;
    //   });
    // } catch (err) {
    //   throw err;
    // }
    return new Promise((resolve, reject) => {
      postForStream('/Service/disclosure/stream', params)
        .then(res => {
          res.data.on('data', (chunk: Buffer) => onChunk(chunk));
          res.data.on('end', () => resolve());
          res.data.on('error', (err: Error) => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * 专利撰写服务
   */
  static async helperPatentStream(
    params: HelperPatentStreamRequestParams,
    onChunk: (chunk: Buffer) => void
  ): Promise<void> {
    // try {
    //   // 发起请求
    //   const res = await postForStream('/Service/patent/stream', params);
    //   // 获取数据
    //   const { data } = res;
    //   // 设置监听
    //   data.on('data', (chunk: Buffer) => onChunk(chunk));
    //   data.on('end', () => {});
    //   data.on('error', (err: Error) => {
    //     throw err.message;
    //   });
    // } catch (err) {
    //   throw err;
    // }
    return new Promise((resolve, reject) => {
      postForStream('/Service/patent/stream', params)
        .then(res => {
          res.data.on('data', (chunk: Buffer) => onChunk(chunk));
          res.data.on('end', () => resolve());
          res.data.on('error', (err: Error) => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * 搜索策略生成服务
   */
  static async searchStrategy(question: string) {
    try {
      const res = await post('/Service/strategy', { question: encodeURIComponent(question) });
      const { ok, result } = res.data;
      if (ok) {
        return result;
      }
      throw new Error('搜索策略生成服务异常');
    } catch (err) {
      throw err;
    }
  }
}
