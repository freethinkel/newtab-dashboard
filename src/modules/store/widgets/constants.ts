export const GRID_COLS = 6;

export const DEFAULT_WIDGET_CONFIG = {
  config: {
    x: 0,
    y: 0,
    w: 2,
    h: 2,
  },
  data: {
    code: [
      "<script>",
      "const title = 'world';",
      "</script>",
      "",
      "<h1 on:pointerdown|stopPropagation>Hello {title}</h1>",
      "",
      "<style>",
      "  h1 { text-align: center; }",
      "</style>",
    ].join("\n"),
  },
};
