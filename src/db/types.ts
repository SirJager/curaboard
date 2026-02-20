import {Selectable} from "kysely";
import * as dbtypes from "./schema";

// Exporting types for easier access
export type IFormTypes = Selectable<dbtypes.FormType>;
export type IFormUpdates = Selectable<dbtypes.FormUpdate>;

export type IUser = Pick<
	Selectable<dbtypes.DirectusUser>,
	"id" | "email" | "first_name" | "last_name" | "avatar" | "tags" | "description"
>;

export const UserFields = ["id", "email", "first_name", "last_name", "description", "avatar", "tags"] as const;
