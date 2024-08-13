import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: "tasks",
      columns: [
        { name: "description", type: "string" },
        { name: "complete", type: "boolean" },
        { name: "image", type: "string", isOptional: true },
        { name: "user_id", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
