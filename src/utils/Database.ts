import { Client } from 'pg';
import type { Client as PgClient, QueryResult } from 'pg';

interface QueryParams {
  databaseName?: string;
  sql: string;
  values?: Array<unknown>;
}

export interface DatabaseTableColumn {
  columnName: string; // 字段名
  columnType: string; // 字段类型
  isPrimaryKey?: boolean; // 是否主键
  isForeignKey?: boolean; // 是否外键
  references?: { tableName: string; columnName: string }; // 外键关联
  isUnique?: boolean; // 是否唯一
  isNotNull?: boolean; // 是否非空
  defaultValue?: string; // 默认值
}

interface DatabaseTableValue {
  [key: string]: string | number;
}

export interface DatabaseTable {
  tableName: string; // 表名
  tableColumns: Array<DatabaseTableColumn>; // 表字段
  tableValues?: Array<DatabaseTableValue>; // 表数据
}

/**
 * 数据库工具类
 */
export default class Database {
  /**
   * 私有方法：创建数据库客户端
   */
  private static createClient(databaseName?: string): PgClient {
    const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
      process.env;
    return new Client({
      host: DATABASE_HOST,
      port: Number(DATABASE_PORT),
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: databaseName || DATABASE_NAME,
    });
  }

  /**
   * 私有方法：启动数据库连接
   */
  private static async startConnect(client: PgClient | null): Promise<void> {
    if (!client) {
      throw new Error('数据库客户端未创建');
    }
    try {
      await client.connect();
    } catch (error) {
      throw error;
    }
  }

  /**
   * 私有方法：关闭数据库连接
   */
  private static async closeConnect(client: PgClient | null): Promise<void> {
    if (!client) {
      throw new Error('数据库客户端未创建');
    }
    try {
      await client.end();
    } catch (error) {
      throw error;
    }
  }

  /**
   * 公共方法：执行数据库查询
   */
  static async query(queryParams: QueryParams): Promise<QueryResult> {
    const { databaseName, sql, values } = queryParams;
    // 创建数据库客户端
    const client = Database.createClient(databaseName);
    try {
      // 启动数据库连接
      await Database.startConnect(client);
      // 执行 sql 语句
      const result = await client.query(sql, values);
      // 关闭数据库连接
      await Database.closeConnect(client);
      // 返回执行结果
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 私有方法：创建数据库（如果不存在）
   */
  private static async createDatabaseIfNotExist(): Promise<void> {
    const defaultDatabaseName = 'postgres';
    const { DATABASE_NAME: targetDatabaseName = '' } = process.env;
    try {
      // 1.检测数据库是否存在
      const result = await Database.query({
        databaseName: defaultDatabaseName,
        sql: `SELECT EXISTS (
          SELECT datname
          FROM pg_catalog.pg_database
          WHERE datname = $1
        );`,
        values: [targetDatabaseName],
      });
      // 2.如果数据库不存在，执行创建
      if (!result.rows[0].exists) {
        await Database.query({
          databaseName: defaultDatabaseName,
          sql: `CREATE DATABASE ${targetDatabaseName};`,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 私有方法：创建数据表（如果不存在）
   */
  private static async createTableIfNotExist(databaseTable: DatabaseTable) {
    const { tableName, tableColumns, tableValues } = databaseTable;
    try {
      // 1.检测数据表是否存在
      const result = await Database.query({
        sql: `SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = $1
        );`,
        values: [tableName],
      });
      // 2.如果数据表不存在，执行创建
      if (!result.rows[0].exists) {
        const tableColumnNames = tableColumns
          .map((item: DatabaseTableColumn) => {
            const {
              columnName,
              columnType,
              isPrimaryKey,
              isForeignKey,
              references,
              isUnique,
              isNotNull,
              defaultValue,
            } = item;
            let columnSql = `${columnName} ${columnType}`;
            if (isPrimaryKey) {
              columnSql += ' PRIMARY KEY';
            }
            if (isForeignKey && references) {
              const { tableName: rTableName, columnName: rColumnName } = references;
              columnSql += `, FOREIGN KEY (${columnName}) REFERENCES ${rTableName}(${rColumnName})`;
            }
            if (isUnique) {
              columnSql += ' UNIQUE';
            }
            if (isNotNull) {
              columnSql += ' NOT NULL';
            }
            if (defaultValue) {
              columnSql += ` DEFAULT ${defaultValue}`;
            }
            return columnSql;
          })
          .join(', ');
        await Database.query({ sql: `CREATE TABLE "${tableName}" (${tableColumnNames});` });
        // 3.如果存在初始化数据，插入数据
        if (Array.isArray(tableValues) && tableValues.length > 0) {
          for (const tableValue of tableValues) {
            const columns = Object.keys(tableValue);
            const columnNames = columns.join(', ');
            const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
            const values = Object.values(tableValue);
            await Database.query({
              sql: `INSERT INTO "${tableName}" (${columnNames}) VALUES (${placeholders});`,
              values,
            });
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 公共方法：数据库初始化
   */
  static async initialize(databaseTables: Array<DatabaseTable>) {
    try {
      await Database.createDatabaseIfNotExist();
      for (const databaseTable of databaseTables) {
        await Database.createTableIfNotExist(databaseTable);
      }
    } catch (error) {
      throw error;
    }
  }
}
