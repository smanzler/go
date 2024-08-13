import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import migrations from "./migrations";
import Task from "../models/Task";

const adapter = new SQLiteAdapter({
  schema,
  // migrations,
  jsi: true,
  onSetUpError: (error) => {
    console.log(error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Task],
});

export default database;

export const tasksCollection = database.get<Task>("tasks");
