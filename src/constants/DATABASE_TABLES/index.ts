import type { DatabaseTable } from '@/utils/Database';
import LoginUsersTable from './LoginUsersTable';
import UserScoresTable from './UserScoresTable';

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
];

export default DATABASE_TABLES;
