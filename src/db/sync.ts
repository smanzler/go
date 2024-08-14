import { synchronize } from "@nozbe/watermelondb/sync";
import database from ".";
import { supabase } from "../lib/supabase";

export async function mySync() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      console.log("pulling changes");
      return { changes: {}, timestamp: +new Date() };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log("pushing changes", changes.tasks.created);

      const { error } = await supabase.rpc("push", { changes });

      if (error) console.log(error);
    },
  });
}
