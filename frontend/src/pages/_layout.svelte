<script>
  import { ready } from "@sveltech/routify";
  import setupApplication from "../setupApplication";

  import Navigation from "components/Navigation/Navigation.svelte";

  let applicationHasLoaded = false;

  //Load the services, and then once it has been successful let the app render itself.
  //We may not need to call $ready() here, this is just for SSR
  setupApplication().then(() => {
    applicationHasLoaded = true;
    $ready();
  });
</script>

{#if applicationHasLoaded}
  <Navigation />

  <main>
    <slot />
  </main>
{:else}Beautiful loading spinner...{/if}

<style>
  :global(#app) {
    display: flex;
    min-height: 100vh;
  }

  main {
    padding: 24px;
    padding-top: 48px;
    width: 100%;
    max-width: 725px;
    margin: 0 auto;
  }
</style>
