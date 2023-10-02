import type { RequestHandler } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

import { db } from "@/db";

export const DELETE: RequestHandler = async event => {
  const { id } = event.params;

  if (!id) return error(400, { message: "No id provided" });

  await db.execute({
    sql: "DELETE FROM checkins WHERE id = :id",
    args: { id },
  });

  return new Response(null, { status: 204 });
};
