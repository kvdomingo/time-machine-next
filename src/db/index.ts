import * as path from "path";

import { createClient } from "@libsql/client";

const BASE_DIR = path.resolve();

const DB_URL = import.meta.env.PROD
  ? "libsql+wss://time-machine-kvdomingo.turso.io"
  : `file://${BASE_DIR}/db.sqlite3`;

export const db = createClient({
  url: DB_URL,
  authToken: import.meta.env.VITE_AUTH_TOKEN,
});
