<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button, Icon, WidgetPreview } from "../../../modules/shared";

  export let code = "";

  const dispatch = createEventDispatcher();
</script>

<div class="wrapper">
  <div class="toolbar">
    <div class="controls" on:pointerdown|stopPropagation>
      <Button mode="icon" on:click={() => dispatch("settings")}>
        <Icon name="settings" />
      </Button>
      <Button mode="icon" on:click={() => dispatch("remove")}>
        <Icon name="x" />
      </Button>
    </div>
  </div>

  <div class="body">
    <div class="widget-wrapper">
      <WidgetPreview {code} />
    </div>
  </div>
</div>

<style lang="postcss">
  .toolbar {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
  }

  .wrapper {
    background-color: var(--color-panel);
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    padding: 8px;
    position: relative;

    &:hover {
      & .controls {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }

  .controls {
    transition: 0.2s;
    opacity: 0;
    transform: translateY(-4px);
    display: flex;
    gap: 10px;
  }

  .body {
    height: 100%;
  }

  .widget-wrapper {
    height: 100%;
  }
</style>
