import type { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

type ComponentProps = Record<string, any>;

type ModalOptions = {
  props?: ComponentProps;
  title?: string;
  isFullscreen?: boolean;
};

const DEFAULT = {
  current: null as typeof SvelteComponent | null,
  title: "",
  props: null as ComponentProps | null,
  isFullscreen: false,
};

const store = writable({ ...DEFAULT });

store.subscribe((state) => {
  if (state.current) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

export const modal$ = {
  subscribe: store.subscribe,
  openModal(
    component: typeof SvelteComponent,
    { title, props, isFullscreen }: ModalOptions
  ) {
    store.update((state) => {
      state.current = component;
      state.title = title;
      state.props = props;
      state.isFullscreen = isFullscreen;

      return state;
    });
  },
  closeModal() {
    store.set({ ...DEFAULT });
  },
};
