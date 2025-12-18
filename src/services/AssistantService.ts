import { postForStream, post } from '@/utils/request';

export interface HelperPatentStreamRequestParams {
  session_id?: string;
  question: string;
  code: string;
  file_url?: string;
}

export interface HelperDisclosureStreamRequestParams {
  session_id?: string;
  question: string;
  code: string;
}

export interface ConsultStreamRequestParams {
  session_id?: string;
  question: string;
}

/**
 * 大模型助理服务
 */
export default class AssistantService {
  /**
   * 专利撰写服务（新版）
   */
  static async helperPatentStream(
    params: HelperPatentStreamRequestParams,
    onChunk: (chunk: Buffer) => void
  ): Promise<void> {
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
   * 技术交底书撰写服务（新版）
   */
  static async helperDisclosureStream(
    params: HelperDisclosureStreamRequestParams,
    onChunk: (chunk: Buffer) => void
  ): Promise<void> {
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
   * 提问服务（新版）
   */
  static async consultStream(
    params: ConsultStreamRequestParams,
    onChunk: (chunk: Buffer) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      postForStream('/Agent/chart/stream', params)
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
