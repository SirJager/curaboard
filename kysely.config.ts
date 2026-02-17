import {defineConfig} from "kysely-ctl";

export const DATABASE_NAME = "tmp/sqlite.db";

export default defineConfig({
	dialect: {
	},
	migrations: {
		migrationFolder: "src/db/migrations",
	},
});
