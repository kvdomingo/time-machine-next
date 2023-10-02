import { randomUUID } from "crypto";

import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

import { db } from "@/db";
import { Checkins, CheckinForm, Checkin } from "@/types/checkin";

export const GET: RequestHandler = async () => {
  const rs = await db.execute("SELECT * FROM checkins");
  return json(Checkins.parse(rs.rows));
};

export const POST: RequestHandler = async event => {
  const data: CheckinForm = await event.request.json();

  const rs = await db.execute({
    sql: `
      INSERT INTO checkins (id, recordDate, tag, activity, startTime, duration)
      VALUES (:id, :recordDate, :tag, :activity, :startTime, :duration)
      RETURNING *
    `,
    args: {
      ...data,
      id: randomUUID(),
    },
  });

  return json(Checkin.parse(rs.rows[0]));
};
