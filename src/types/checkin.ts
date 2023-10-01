import { z } from "zod";

export const CheckinForm = z.object({
  recordDate: z.date(),
  tag: z.string(),
  activity: z.string(),
  startTime: z.date(),
  duration: z.number({ coerce: true }).positive(),
});

export type CheckinForm = z.infer<typeof CheckinForm>;
