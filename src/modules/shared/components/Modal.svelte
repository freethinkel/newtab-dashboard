<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";

  export let title = "";
  export let isFullscreen = false;

  const dispatch = createEventDispatcher();
</script>

<div class="container">
  <div class="wrapper" class:fullscreen={isFullscreen}>
    <header>
      <h5>
        {title}
      </h5>

      <Button mode="icon" on:click={() => dispatch("close")}>
        <Icon name="x" />
      </Button>
    </header>
    <div class="inner">
      <slot />
    </div>
  </div>
</div>

<style lang="postcss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-overlay);
    height: 100%;
    width: 100%;
    padding: 12px;
  }

  .wrapper {
    background: var(--color-background);
    border-radius: var(--border-radius);
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .fullscreen {
    max-width: 100%;
    width: 100%;
    height: 100%;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid var(--color-border);
  }

  h5 {
    font-size: 1.3rem;
  }

  .inner {
    flex-grow: 1;
  }
</style>
