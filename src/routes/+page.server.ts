import { randomUUID } from "crypto";

import type { Actions, PageServerLoad } from "./$types";

import { db } from "@/db";
import { Checkins, CheckinForm } from "@/types/checkin";

export const load: PageServerLoad = async () => {
  const rs = await db.execute("SELECT * FROM checkins");
  return { checkins: Checkins.parse(rs.rows) };
};

export const actions = {
  create: async event => {
    const data: CheckinForm = await event.request.json();

    const rs = await db.execute({
      sql: "INSERT INTO checkins (id, recordDate, tag, activity, startTime, duration) VALUES (:id, :recordDate, :tag, :activity, :startTime, :duration)",
      args: {
        ...data,
        id: randomUUID(),
      },
    });

    console.log(rs);
  },
} satisfies Actions;
