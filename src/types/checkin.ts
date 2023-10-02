import { z } from "zod";

export const CheckinForm = z.object({
  recordDate: z.string().datetime(),
  tag: z.string(),
  activity: z.string(),
  startTime: z.string().datetime(),
  duration: z.number({ coerce: true }).positive(),
});

export type CheckinForm = z.infer<typeof CheckinForm>;

export const Checkin = CheckinForm.extend({
  id: z.string().uuid(),
});

export type Checkin = z.infer<typeof Checkin>;

export const Checkins = z.array(Checkin);

export type Checkins = z.infer<typeof Checkins>;
