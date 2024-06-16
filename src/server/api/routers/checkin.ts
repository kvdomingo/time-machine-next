import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { checkins } from "@/server/db/schema";
import { CreateCheckinSchema, UpdateCheckinSchema } from "@/types/checkin";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const checkinRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z
        .object({
          startDate: z.string().optional(),
          endDate: z.string().optional(),
        })
        .optional(),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.checkins.findMany({
        where: (checkins, { eq, lte, gte, and }) =>
          and(
            eq(checkins.user_id, ctx.session.user.id),
            gte(checkins.record_date, input?.startDate ?? "1970-01-01"),
            lte(checkins.record_date, input?.endDate ?? "2099-12-31"),
          ),
        orderBy: (checkins, { desc }) => [desc(checkins.record_date)],
      });
    }),
  create: protectedProcedure
    .input(CreateCheckinSchema)
    .mutation(({ ctx, input }) =>
      ctx.db
        .insert(checkins)
        .values({
          ...input,
          user_id: ctx.session.user.id,
          updated: new Date(),
        })
        .returning(),
    ),
  update: protectedProcedure
    .input(UpdateCheckinSchema)
    .mutation(({ ctx, input }) => {
      const { id, ...body } = input;

      return ctx.db
        .update(checkins)
        .set(body)
        .where(
          and(eq(checkins.user_id, ctx.session.user.id), eq(checkins.id, id)),
        )
        .returning();
    }),
});
