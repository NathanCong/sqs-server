import type { DatabaseTable } from '@/utils/Database';
import LoginUsersTable from './LoginUsersTable';
import UserScoresTable from './UserScoresTable';
import UserExpressionsTable from './UserExpressionsTable';

const DATABASE_TABLES: Array<DatabaseTable> = [
  {
    tableName: LoginUsersTable.name,
    tableColumns: LoginUsersTable.columns,
    tableValues: LoginUsersTable.values,
  },
  {
    tableName: UserScoresTable.name,
    tableColumns: UserScoresTable.columns,
    tableValues: UserScoresTable.values,
  },
  {
    tableName: UserExpressionsTable.name,
    tableColumns: UserExpressionsTable.columns,
    tableValues: UserExpressionsTable.values,
  },
];

export default DATABASE_TABLES;
