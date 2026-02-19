import {Selectable} from "kysely";
import * as dbtypes from "./schema";

// Exporting types for easier access
export type IFormTypes = Selectable<dbtypes.FormTypes>;
export type IFormUpdates = Selectable<dbtypes.FormUpdates>;
