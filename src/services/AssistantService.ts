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
}
