import { postForStream, post } from '@/utils/request';

/**
 * 大模型助理服务
 */
export default class AssistantService {
  /**
   * 提问服务
   */
  static async askStream(
    params: AskStreamRequestParams,
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
   * 语义分析服务
   */
  static analysisSemantics(question: string) {
    return post('/intent/classify', { question });
  }

  /**
   * 技术交底书撰写服务
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
   * 专利撰写服务
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
   * 搜索策略生成服务
   */
  static async searchStrategy(question: string) {
    try {
      const res = await post('/Service/strategy', { question });
      const { ok, result } = res.data;
      if (ok) {
        return result;
      }
      throw new Error('搜索策略生成服务异常');
    } catch (error) {
      throw error;
    }
  }
}
