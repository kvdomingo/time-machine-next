import { z } from "zod";

export const CheckinForm = z.object({
  recordDate: z.date(),
  tag: z.string(),
  activity: z.string(),
  startTime: z.date(),
  duration: z.number({ coerce: true }).positive(),
});

export type CheckinForm = z.infer<typeof CheckinForm>;

export const Checkin = z.object({
  id: z.string().uuid(),
  recordDate: z.string().datetime(),
  tag: z.string(),
  activity: z.string(),
  startTime: z.string().datetime(),
  duration: z.number({ coerce: true }).positive(),
});

export type Checkin = z.infer<typeof Checkin>;

export const Checkins = z.array(Checkin);

export type Checkins = z.infer<typeof Checkins>;
