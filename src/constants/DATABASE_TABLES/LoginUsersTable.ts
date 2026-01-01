import type { DatabaseTableColumn } from '@/utils/Database';

/**
 * 登录用户表
 */
export default class LoginUsersTable {
  /**
   * 表名
   */
  static readonly name = 'login_users';

  /**
   * 表结构
   */
  static readonly columns: DatabaseTableColumn[] = [
    {
      columnName: 'id',
      columnType: 'SERIAL',
      isPrimaryKey: true,
    },
    {
      columnName: 'user_name',
      columnType: 'VARCHAR(100)',
      isNotNull: true,
    },
    {
      columnName: 'user_phone',
      columnType: 'VARCHAR(11)',
      isUnique: true,
      isNotNull: true,
    },
    {
      columnName: 'user_email',
      columnType: 'VARCHAR(100)',
      isUnique: true,
      isNotNull: true,
    },
    {
      columnName: 'user_password',
      columnType: 'VARCHAR(100)',
      isNotNull: true,
    },
    {
      columnName: 'created_at',
      columnType: 'TIMESTAMP',
      isNotNull: true,
      defaultValue: 'CURRENT_TIMESTAMP',
    },
  ];

  /**
   * 表数据
   */
  static readonly values = [];
}
