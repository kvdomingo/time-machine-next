import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { CreateCheckinSchema, UpdateCheckinSchema } from "@/types/checkin";

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
      return ctx.db.checkin.findMany({
        where: {
          AND: [
            { created_by_id: ctx.session.user.id },
            { record_date: { gte: input?.startDate ?? "1970-01-01" } },
            { record_date: { lte: input?.endDate ?? "2099-12-31" } },
          ],
        },
        orderBy: {
          record_date: "desc",
        },
      });
    }),
  create: protectedProcedure
    .input(CreateCheckinSchema)
    .mutation(({ ctx, input }) =>
      ctx.db.checkin.create({
        data: {
          ...input,
          created_by_id: ctx.session.user.id,
          modified: new Date(),
        },
      }),
    ),
  update: protectedProcedure
    .input(UpdateCheckinSchema)
    .mutation(({ ctx, input }) => {
      const { id, ...body } = input;

      return ctx.db.checkin.update({
        data: body,
        where: {
          id,
          created_by_id: ctx.session.user.id,
        },
      });
    }),
});
