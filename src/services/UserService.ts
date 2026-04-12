import Database from '@/utils/Database';
import dayjs from 'dayjs';

export interface RegisterParams {
  userName: string;
  userPhone: string;
  userEmail: string;
  userPassword: string;
}

export interface LoginParams {
  userEmail: string;
  userPassword: string;
}

export interface PocParams {
  userEmail: string;
  modelName: string;
  questionType: string;
  score: number;
  originData: string;
}

export interface GetUserInfoParams {
  userEmail: string;
}

export interface UserInfo {
  userName: string;
  userPhone: string;
  userEmail: string;
  userPassword: string;
}

export interface UpdateUserInfoParams {
  userEmail: string;
  userName: string;
  userPhone: string;
  userPassword: string;
}

export interface AddExpressionParams {
  userEmail: string;
  expressionType: number;
  expressionText: string;
  resultData: string;
}

export interface GetExpressionListParams {
  userEmail: string;
  expressionType?: number;
  createdAt?: string;
}

export interface ExpressionListItem {
  expressionId: number;
  expressionType: number;
  expressionText: string;
  resultData: string;
  creator: string;
  createdAt: string;
  updater: string;
  updatedAt: string;
}

export interface UpdateExpressionParams {
  userEmail: string;
  expressionId: number;
  expressionText: string;
  resultData: string;
}

export interface DeleteExpressionParams {
  expressionId: number;
}

/**
 * 用户服务
 */
export default class UserService {
  /**
   * 用户 - 注册
   */
  static async register({
    userName,
    userPhone,
    userEmail,
    userPassword,
  }: RegisterParams): Promise<void> {
    try {
      const { rowCount } = await Database.query({
        sql: `INSERT INTO login_users (user_name, user_phone, user_email, user_password)
              VALUES ($1, $2, $3, $4);`,
        values: [userName, userPhone, userEmail, userPassword],
      });
      if (Number(rowCount) < 1) {
        throw new Error('注册失败');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 用户 - 登录
   */
  static async login({ userEmail, userPassword }: LoginParams): Promise<string> {
    try {
      // 查询用户
      const { rows } = await Database.query({
        sql: `SELECT * FROM login_users WHERE user_email = $1;`,
        values: [userEmail],
      });
      // 用户不存在
      if (rows.length < 1) {
        throw new Error('该用户未注册！');
      }
      // 密码错误
      if (rows[0].user_password !== userPassword) {
        throw new Error('登录密码错误！');
      }
      // 返回 token
      return Buffer.from(JSON.stringify({ userEmail, userPassword })).toString('base64');
    } catch (error) {
      throw error;
    }
  }

  /**
   * 用户 - 评分
   */
  static async poc({
    userEmail,
    modelName,
    questionType,
    score,
    originData,
  }: PocParams): Promise<void> {
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

  /**
   * 用户 - 获取个人信息
   */
  static async getUserInfo({ userEmail }: GetUserInfoParams): Promise<UserInfo> {
    try {
      // 查询用户
      const { rows } = await Database.query({
        sql: `SELECT * FROM login_users WHERE user_email = $1;`,
        values: [userEmail],
      });
      // 用户不存在
      if (rows.length < 1) {
        throw new Error('该用户未注册！');
      }
      // 返回用户信息
      const { user_name, user_phone, user_email, user_password } = rows[0];
      return {
        userName: user_name,
        userPhone: user_phone,
        userEmail: user_email,
        userPassword: user_password,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 用户 - 更新个人信息
   */
  static async updateUserInfo({
    userEmail,
    userName,
    userPhone,
    userPassword,
  }: UpdateUserInfoParams): Promise<void> {
    try {
      // 更新用户信息
      const { rowCount } = await Database.query({
        sql: `UPDATE login_users SET user_name = $1, user_phone = $2, user_password = $3 WHERE user_email = $4;`,
        values: [userName, userPhone, userPassword, userEmail],
      });
      // 更新用户信息失败
      if (Number(rowCount) < 1) {
        throw new Error('更新用户信息失败');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 用户 - 新增表达式
   */
  static async addExpression({
    userEmail,
    expressionType,
    expressionText,
    resultData,
  }: AddExpressionParams): Promise<void> {
    try {
      // 查询用户
      const { rows } = await Database.query({
        sql: `SELECT id FROM login_users WHERE user_email = $1;`,
        values: [userEmail],
      });
      // 用户不存在
      if (rows.length < 1) {
        throw new Error('该用户未注册！');
      }
      // 获取用户信息
      const { id } = rows[0];
      // 插入表达式
      const { rowCount } = await Database.query({
        sql: `INSERT INTO user_expressions (login_users_id, expression_type, expression_text, result_data, creator)
              VALUES ($1, $2, $3, $4, $5);`,
        values: [id, expressionType, expressionText, resultData, userEmail],
      });
      if (Number(rowCount) < 1) {
        throw new Error('新增表达式失败');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 用户 - 获取表达式列表
   */
  static async getExpressionList({
    userEmail,
    expressionType,
    createdAt,
  }: GetExpressionListParams): Promise<ExpressionListItem[]> {
    try {
      // 查询用户
      const { rows } = await Database.query({
        sql: `SELECT id FROM login_users WHERE user_email = $1;`,
        values: [userEmail],
      });
      // 用户不存在
      if (rows.length < 1) {
        throw new Error('该用户未注册！');
      }
      // 获取用户信息
      const { id } = rows[0];
      // 查询表达式列表（可选条件动态拼接，占位符仍与 values 一一对应）
      const listValues: unknown[] = [id];
      const extraClauses: string[] = [];
      let p = 2;
      if (expressionType) {
        extraClauses.push(`expression_type = $${p}`);
        listValues.push(expressionType);
        p += 1;
      }
      if (createdAt) {
        extraClauses.push(`created_at::date = $${p}::date`);
        listValues.push(createdAt);
        p += 1;
      }
      const whereExtra = extraClauses.length > 0 ? ` AND ${extraClauses.join(' AND ')}` : '';
      const sql = `SELECT * FROM user_expressions WHERE login_users_id = $1${whereExtra} ORDER BY created_at DESC;`;
      const values = listValues;
      const { rows: list } = await Database.query({ sql, values });
      // 返回表达式列表（按创建时间倒序）
      return list.map(row => ({
        expressionId: row.id,
        expressionType: row.expression_type,
        expressionText: row.expression_text,
        resultData: row.result_data,
        creator: row.creator,
        createdAt: row.created_at && dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss'),
        updater: row.updater,
        updatedAt: row.updated_at && dayjs(row.updated_at).format('YYYY-MM-DD HH:mm:ss'),
      }));
    } catch (error) {
      throw error;
    }
  }

  /**
   * 用户 - 更新表达式
   */
  static async updateExpression({
    userEmail,
    expressionId,
    expressionText,
    resultData,
  }: UpdateExpressionParams): Promise<void> {
    try {
      // 更新表达式
      const { rowCount } = await Database.query({
        sql: `UPDATE user_expressions SET expression_text = $1, result_data = $2, updater = $3, updated_at = $4 WHERE id = $5;`,
        values: [
          expressionText,
          resultData,
          userEmail,
          dayjs().format('YYYY-MM-DD HH:mm:ss'),
          expressionId,
        ],
      });
      // 更新表达式失败
      if (Number(rowCount) < 1) {
        throw new Error('更新表达式失败');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 用户 - 删除表达式
   */
  static async deleteExpression({ expressionId }: DeleteExpressionParams): Promise<void> {
    try {
      // 删除表达式
      const { rowCount } = await Database.query({
        sql: `DELETE FROM user_expressions WHERE id = $1;`,
        values: [expressionId],
      });
      // 删除表达式失败
      if (Number(rowCount) < 1) {
        throw new Error('删除表达式失败');
      }
    } catch (error) {
      throw error;
    }
  }
}
