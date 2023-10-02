<script lang="ts">
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/svelte-query";
  import dateFormat from "dateformat";

  import { api } from "$lib/api";
  import AddCheckinForm from "@/components/AddCheckinForm.svelte";

  const now = new Date();
  const today = dateFormat(now, "dddd, d mmmm yyyy");

  const queryClient = useQueryClient();

  const query = createQuery({
    queryKey: ["checkins"],
    queryFn: api.checkins.list,
  });

  const mutation = createMutation({
    mutationKey: ["checkin"],
    mutationFn: api.checkins.delete,
  });

  function onDelete(id: string) {
    $mutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["checkins"] });
      },
    });
  }

  $: checkins = $query.data?.data ?? [];
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
          <li class="flex justify-between border-t px-4 py-2">
            <div class="flex items-center">
              {checkin.duration.toFixed(2)} hr{checkin.duration === 1
                ? ""
                : "s"}
              <button class="btn btn-primary btn-ghost btn-sm lowercase">
                #{checkin.tag}
              </button>
              {checkin.activity}
            </div>
            <button
              class="btn btn-circle btn-error btn-ghost btn-sm"
              on:click={() => onDelete(checkin.id)}>🗑</button
            >
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</main>
