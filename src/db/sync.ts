import { synchronize } from "@nozbe/watermelondb/sync";
import database from ".";
import { supabase } from "../lib/supabase";

export async function mySync() {
  await synchronize({
    database,
    sendCreatedAsUpdated: true,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      const { data, error } = await supabase.rpc("pull", {
        last_pulled_at: lastPulledAt,
        schemaversion: schemaVersion,
        migration,
      });

      console.log(JSON.stringify(data));
      if (error) console.log(error);

      return { changes: data.changes, timestamp: data.timestamp };
    },
    pushChanges: async ({ changes }) => {
      console.log("pushing changes:", changes);

      const { error } = await supabase.rpc("push", { changes });

      if (error) console.log(error);
    },
  });
}
