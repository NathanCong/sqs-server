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

/**
 * 登录服务
 */
export default class LoginService {
  /**
   * 新用户注册
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
   * 老用户登录
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
}
