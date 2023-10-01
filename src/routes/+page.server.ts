import type { Actions } from "@sveltejs/kit/src/exports/public";

export const actions = {
  default: async event => {
    console.log(event.params);
  },
} satisfies Actions;
