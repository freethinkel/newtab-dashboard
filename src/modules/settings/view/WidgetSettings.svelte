<script lang="ts">
  import { widgets$ } from "../../store/widgets";

  import { init as initEditor } from "../../editor";
  import { WidgetPreview } from "../../shared";

  export let id: string;
  export let code: string;

  const onUpdate = (content: string) => {
    widgets$.updateWidgetContent(id, content);
    code = content;
  };
</script>

<div class="wrapper">
  <div class="layout">
    <div class="editor" use:initEditor={{ onUpdate, content: code }} />
    <div class="preview">
      <div class="preview__inner">
        <WidgetPreview {code} />
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    height: 100%;
  }
  .editor {
    height: 100%;
  }
  .layout {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
  }
  .preview {
    min-width: 400px;
    &__inner {
      height: auto;
      min-height: 300px;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
    }
  }
</style>
