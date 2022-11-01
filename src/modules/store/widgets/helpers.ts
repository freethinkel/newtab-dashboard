import { nanoid } from "nanoid";
import gridHelp from "svelte-grid/build/helper";
import { DEFAULT_WIDGET_CONFIG, GRID_COLS } from "./constants";
import type { WidgetItem } from "./types";

export const addNewItem = (items: WidgetItem[]): WidgetItem => {
  return {
    ...DEFAULT_WIDGET_CONFIG,
    config: {
      ...DEFAULT_WIDGET_CONFIG.config,

      ...gridHelp.findSpace(
        { [GRID_COLS]: DEFAULT_WIDGET_CONFIG.config },
        items.map((item) => ({ 6: item.config })),
        GRID_COLS
      ),
    },
    id: nanoid(),
  };
};

export const importFile = (extension?: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    if (extension) {
      input.setAttribute("accept", `.${extension}`);
    }
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onerror = reject;
        reader.onload = () => {
          resolve(String(reader.result));
          input.remove();
        };
      } else {
        resolve(null);
        input.remove();
      }
    };
    input.click();
  });
};

export const downloadFile = (name: string, content: string): void => {
  var link = document.createElement("a");
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  link.setAttribute("download", name);
  link.click();
};

export class Storage {
  static instance: Storage = new Storage();

  async getItem(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return null;
    }
  }

  async setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
