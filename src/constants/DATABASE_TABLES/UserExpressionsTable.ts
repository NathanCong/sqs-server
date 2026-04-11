import type { DatabaseTableColumn } from '@/utils/Database';

/**
 * 用户检索式表
 */
export default class UserExpressionsTable {
  /**
   * 表名
   */
  static readonly name = 'user_expressions';

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
      columnName: 'login_users_id',
      columnType: 'SERIAL',
      isForeignKey: true,
      references: {
        tableName: 'login_users',
        columnName: 'id',
      },
    },
    {
      columnName: 'expression_type',
      columnType: 'SMALLINT',
      isNotNull: true,
    },
    {
      columnName: 'expression_text',
      columnType: 'TEXT',
      isNotNull: true,
    },
    {
      columnName: 'result_data',
      columnType: 'TEXT',
      isNotNull: true,
    },
    {
      columnName: 'creator',
      columnType: 'VARCHAR(100)',
      isNotNull: true,
    },
    {
      columnName: 'created_at',
      columnType: 'TIMESTAMP',
      isNotNull: true,
      defaultValue: 'CURRENT_TIMESTAMP',
    },
    {
      columnName: 'updater',
      columnType: 'VARCHAR(100)',
    },
    {
      columnName: 'updated_at',
      columnType: 'TIMESTAMP',
    },
  ];

  /**
   * 表数据
   */
  static readonly values = [];
}
