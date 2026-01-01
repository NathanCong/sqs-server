import Database from '@/utils/Database';

export interface PocParams {
  userEmail: string;
  modelName: string;
  questionType: string;
  score: number;
  originData: string;
}

/**
 * 用户评价服务
 */
export default class PocService {
  /**
   * 用户评分
   */
  static async index({ userEmail, modelName, questionType, score, originData }: PocParams) {
    try {
      const { rows } = await Database.query({
        sql: `SELECT id FROM login_users WHERE user_email = $1;`,
        values: [userEmail],
      });
      // 用户不存在
      if (rows.length < 1) {
        throw new Error('评价用户未注册！');
      }
      // 插入评分
      const { rowCount } = await Database.query({
        sql: `INSERT INTO user_scores (login_users_id, model_name, question_type, score, origin_data)
              VALUES ($1, $2, $3, $4, $5);`,
        values: [rows[0].id, modelName, questionType, score, originData],
      });
      if (Number(rowCount) < 1) {
        throw new Error('评分失败');
      }
    } catch (error) {
      throw error;
    }
  }
}
