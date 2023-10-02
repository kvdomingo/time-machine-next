<script lang="ts">
  import "@fontsource/figtree/600.css";
  import "@fontsource/figtree/300.css";
  import "@fontsource/figtree/400.css";
  import "@fontsource/figtree/500.css";
  import "@fontsource/figtree/700.css";
  import "@/styles/base.css";
  import { QueryClientProvider } from "@tanstack/svelte-query";

  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<QueryClientProvider client={data.queryClient}>
  <slot />
</QueryClientProvider>
