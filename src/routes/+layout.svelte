<script lang="ts">
  import "@fontsource/figtree/600.css";
  import "@fontsource/figtree/300.css";
  import "@fontsource/figtree/400.css";
  import "@fontsource/figtree/500.css";
  import "@fontsource/figtree/700.css";
  import "@/styles/base.css";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

  import { browser } from "$app/environment";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
