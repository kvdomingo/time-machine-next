<script lang="ts">
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import dateFormat from "dateformat";
  import dayjs from "dayjs";

  import { api } from "$lib/api";
  import { CheckinForm } from "@/types/checkin";

  const queryClient = useQueryClient();

  let isAdding = false;

  let recordDate: string = dateFormat(new Date(), "yyyy-mm-dd");
  let startTime: string = dateFormat(new Date(), "HH:MM");
  let endTime: string = dateFormat(new Date(), "HH:MM");
  let duration: number = 0;

  function onClick() {
    isAdding = true;
  }

  function onChangeDuration() {
    endTime = dateFormat(
      dayjs(new Date(`${recordDate} ${startTime}`))
        .add(duration, "hours")
        .toDate(),
      "HH:MM",
    );
  }

  function onChangeStartTime() {}

  function onChangeEndTime() {
    duration =
      (dayjs(new Date(`${recordDate} ${endTime}`)).valueOf() -
        dayjs(new Date(`${recordDate} ${startTime}`)).valueOf()) /
      1000 /
      60 /
      60;
  }

  const mutation = createMutation({
    mutationKey: ["checkin"],
    mutationFn: api.checkins.create,
  });

  async function onSubmit(
    event: Event & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const originalForm = Object.fromEntries(formData) as Record<
      keyof CheckinForm,
      string
    >;
    const form = {} as CheckinForm;
    (Object.entries(originalForm) as [keyof CheckinForm, string][]).forEach(
      ([key, value]) => {
        if (key === "recordDate") {
          form[key] = new Date(value).toISOString();
        } else if (key === "duration") {
          form[key] = parseFloat(value);
        } else if (key === "startTime") {
          form[key] = new Date(
            `${originalForm.recordDate} ${value}`,
          ).toISOString();
        } else {
          form[key] = value;
        }
      },
    );
    const checkinForm = CheckinForm.parse(form);

    $mutation.mutate(checkinForm, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["checkins"] });
        isAdding = false;
      },
      onError: e => {
        console.error(e);
      },
    });
  }

  function onReset() {
    isAdding = false;
  }
</script>

<li class="px-4 py-2" class:text-center={!isAdding}>
  {#if isAdding}
    <form on:submit={onSubmit} on:reset={onReset}>
      <input
        name="recordDate"
        type="date"
        placeholder="Record date"
        class="input input-bordered input-ghost"
        bind:value={recordDate}
      />
      <input
        name="tag"
        placeholder="Tag"
        class="input input-bordered input-ghost"
      />
      <input
        name="activity"
        placeholder="Activity"
        class="input input-bordered input-ghost"
      />
      <input
        name="startTime"
        type="time"
        placeholder="Start time"
        class="input input-bordered input-ghost"
        bind:value={startTime}
        on:change={onChangeStartTime}
      />
      <input
        type="time"
        placeholder="End time"
        class="input input-bordered input-ghost"
        bind:value={endTime}
        on:change={onChangeEndTime}
      />
      <input
        name="duration"
        type="number"
        step="0.01"
        placeholder="Duration"
        class="input input-bordered input-ghost"
        bind:value={duration}
        on:change={onChangeDuration}
      />
      <button type="reset" class="btn btn-circle btn-primary btn-ghost btn-sm">
        ✖
      </button>
      <button type="submit" class="btn btn-circle btn-primary btn-ghost btn-sm">
        ✔
      </button>
    </form>
  {:else}
    <button
      class="btn btn-primary btn-ghost btn-sm text-center"
      on:click={onClick}
    >
      + Check in
    </button>
  {/if}
</li>
