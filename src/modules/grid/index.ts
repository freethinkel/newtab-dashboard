import View from './View.svelte';

export const init = (el: HTMLElement) => {
	new View({
		target: el
	});
};
