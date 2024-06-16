import { z } from "zod";

export const CreateCheckinSchema = z.object({
  duration: z.coerce.number().gt(0),
  start_time: z.string().length(5),
  record_date: z.string().length(10),
  tag: z.string().min(1),
  activities: z.string(),
});

export type CreateCheckinSchema = z.infer<typeof CreateCheckinSchema>;

export const CheckinSchema = CreateCheckinSchema.extend({
  id: z.string().min(1).max(24),
  user_id: z.string().min(1).max(24),
  created: z.date(),
  updated: z.date(),
});

export type CheckinSchema = z.infer<typeof CheckinSchema>;

export const UpdateCheckinSchema = CreateCheckinSchema.partial().extend({
  id: z.string().min(1).max(24),
});

export type UpdateCheckinSchema = z.infer<typeof UpdateCheckinSchema>;
