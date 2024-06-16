"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateCheckinSchema } from "@/types/checkin";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  addHours,
  differenceInMinutes,
  format,
  isAfter,
  isBefore,
  parse,
} from "date-fns";

export default function CreateCheckin() {
  const [endTime, setEndTime] = useState(format(new Date(), "HH:mm"));

  const form = useForm({
    resolver: zodResolver(CreateCheckinSchema),
    defaultValues: {
      record_date: format(new Date(), "yyyy-MM-dd"),
      duration: 0,
      start_time: format(new Date(), "HH:mm"),
      tag: "",
      activities: "",
    },
  });

  function onChangeStartTime(value: string) {
    const startTime = parse(value, "HH:mm", new Date());
    const endTime_ = parse(endTime, "HH:mm", new Date());

    if (isAfter(startTime, endTime_)) {
      setEndTime(format(startTime, "HH:mm"));
      form.setValue("duration", 0);
      return;
    }

    const duration = form.getValues("duration");
    const delta = addHours(startTime, duration);
    setEndTime(format(delta, "HH:mm"));
  }

  function onChangeEndTime(value: string) {
    setEndTime(value);
    const endTime = parse(value, "HH:mm", new Date());
    const startTime = parse(form.getValues("start_time"), "HH:mm", new Date());

    if (isBefore(endTime, startTime)) {
      form.setValue("start_time", format(endTime, "HH:mm"));
      form.setValue("duration", 0);
      return;
    }

    const duration = differenceInMinutes(endTime, startTime) / 60;
    form.setValue("duration", duration);
  }

  function onChangeDuration(value: number) {
    const startTime = parse(form.getValues("start_time"), "HH:mm", new Date());
    const delta = addHours(startTime, value);
    setEndTime(format(delta, "HH:mm"));
  }

  function onSubmit(values: CreateCheckinSchema) {
    console.log(values);
  }

  function onReset() {
    form.reset();
    setEndTime(format(new Date(), "HH:mm"));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="flex gap-2"
      >
        <FormField
          name="record_date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Record date" type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="tag"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Tag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="activities"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Activities" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="start_time"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Start time"
                  type="time"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onChangeStartTime(e.currentTarget.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormControl>
            <Input
              placeholder="End time"
              value={endTime}
              type="time"
              onChange={(e) => onChangeEndTime(e.currentTarget.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          name="duration"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Duration"
                  type="number"
                  min={0.0}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="reset">❌</Button>
        <Button type="submit">✅</Button>
      </form>
    </Form>
  );
}
