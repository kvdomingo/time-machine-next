import { createClient } from "@libsql/client";

const client = createClient({
  url: `file://../../../db.sqlite`,
});
