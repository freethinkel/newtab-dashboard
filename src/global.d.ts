import type { SvelteComponent } from 'svelte';

declare module 'svelte-grid' {
	const module: SvelteComponent;

	export default module;
}

declare namespace svelte.JSX {
	export interface HTMLAttributes {
		onclickOutside?: () => void;
	}
}
