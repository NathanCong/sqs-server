import Database from '@/utils/Database';

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
}
