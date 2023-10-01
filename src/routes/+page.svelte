<script lang="ts">
  import dateFormat from "dateformat";
  import AddCheckinForm from "@/components/AddCheckinForm.svelte";

  const now = new Date();
  const today = dateFormat(now, "dddd, d mmmm yyyy");

  const checkins: { duration: number; tag: string; activity: string }[] = [
    {
      duration: 1,
      tag: "unicef-giga",
      activity: "dev",
    },
  ];
</script>

<main class="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-950">
  <div class="container flex flex-col gap-6">
    <section>
      <h3>Time Machine</h3>
      <h4>{today}</h4>
    </section>

    <ul class="rounded-2xl border border-solid border-white">
      <AddCheckinForm />

      {#if checkins.length === 0}
        <li class="border-t px-4 py-2 text-center">
          <i>No checkins yet</i>
        </li>
      {:else}
        {#each checkins as checkin}
          <li class="border-t px-4 py-2">
            {checkin.duration.toFixed(2)} hr{checkin.duration === 1 ? "" : "s"}
            #{checkin.tag}
            {checkin.activity}
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</main>
