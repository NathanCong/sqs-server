import { postForStream, post } from '@/utils/request';

export interface ChatStreamRequestParams {
  session_id?: string;
  question: string;
  file_url?: string;
}

export interface HelperDisclosureStreamRequestParams {
  session_id?: string;
  question: string;
  file_url?: string;
  code: string;
}

export interface HelperPatentRewriteStreamRequestParams {
  session_id?: string;
  question: string;
  file_url?: string;
  code: string;
}

export interface SearchDisclosureRequestParams {
  session_id?: string;
  question: string;
  file_url?: string;
}

export interface HelperPatentStreamRequestParams {
  session_id?: string;
  question: string;
  file_url?: string;
  code: string;
}

/**
 * 大模型助理服务
 * 接口文档：https://docs.apipost.net/docs/detail/5f454bb09851000?target_id=2a2b90173f612e
 */
export default class AssistantService {
  /**
   * 聊天服务
   */
  static async chatStream(
    params: ChatStreamRequestParams,
    onChunk: (chunk: Buffer) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('\nChatStreamRequestParams', params);
      postForStream('/chat', params)
        .then(res => {
          res.data.on('data', (chunk: Buffer) => onChunk(chunk));
          res.data.on('end', () => resolve());
          res.data.on('error', (err: Error) => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * 专利交底书撰写服务
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
   * 专利改写服务
   */
  static async helperPatentRewriteStream(
    params: HelperPatentRewriteStreamRequestParams,
    onChunk: (chunk: Buffer) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      postForStream('/llm-task/stream', params)
        .then(res => {
          res.data.on('data', (chunk: Buffer) => onChunk(chunk));
          res.data.on('end', () => resolve());
          res.data.on('error', (err: Error) => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * 交底书查新服务
   */
  static async searchDisclosure(params: SearchDisclosureRequestParams) {
    try {
      const res = await post('/wanxiang-demo', params);
      return res.data;
    } catch (err) {
      throw err;
    }
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
}
