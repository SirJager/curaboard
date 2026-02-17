import {Kysely, PostgresDialect} from "kysely";
import {Pool} from "pg";
import type {DB} from "./schema";

const dialect = new PostgresDialect({
	pool: new Pool({connectionString: process.env.POSTGRES_URI, max: 10}),
});

export type Database = Kysely<DB>;
const db: Database = new Kysely<DB>({dialect});

export default db;

export const DBKey = "db" as const;
