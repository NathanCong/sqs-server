import type { DatabaseTableColumn } from '@/utils/Database';

/**
 * 用户评分表
 */
export default class UserScoresTable {
  /**
   * 表名
   */
  static readonly name = 'user_scores';

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
      columnName: 'model_name',
      columnType: 'VARCHAR(100)',
      isNotNull: true,
    },
    {
      columnName: 'question_type',
      columnType: 'SMALLINT',
      isNotNull: true,
    },
    {
      columnName: 'score',
      columnType: 'REAL',
      isNotNull: true,
    },
    {
      columnName: 'origin_data',
      columnType: 'TEXT',
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
