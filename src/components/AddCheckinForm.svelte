<script lang="ts">
  import { CheckinForm } from "@/types/checkin";

  let isAdding = false;

  function onClick() {
    isAdding = true;
  }

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
          form[key] = new Date(value);
        } else if (key === "duration") {
          form[key] = parseFloat(value);
        } else if (key === "startTime") {
          form[key] = new Date(`${originalForm.recordDate} ${value}`);
        } else {
          form[key] = value;
        }
      },
    );
    const checkinForm = CheckinForm.parse(form);

    try {
      const res = await fetch("?/create", {
        method: "POST",
        body: JSON.stringify(checkinForm),
      });
      console.log(await res.json());
      isAdding = false;
    } catch (e) {
      console.error(e);
    }
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
      />
      <input
        type="time"
        placeholder="End time"
        class="input input-bordered input-ghost"
      />
      <input
        name="duration"
        type="number"
        step="0.01"
        placeholder="Duration"
        class="input input-bordered input-ghost"
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
