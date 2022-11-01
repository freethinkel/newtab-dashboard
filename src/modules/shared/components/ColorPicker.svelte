<script lang="ts">
	import 'vanilla-colorful';
	import 'vanilla-colorful/rgba-string-color-picker.js';
	import { clickOutside } from '../directives/ClickOutside';
	import { createEventDispatcher } from 'svelte';
	import * as polished from 'polished';

	export let color = '#000';

	let isOpen = false;

	const dispatch = createEventDispatcher();

	const norimalizeColor = (color: string) => {
		const c = polished.parseToRgb(color);
		return `rgba(${c.red}, ${c.green}, ${c.blue}, ${
			(c as typeof c & { alpha: number }).alpha ?? 1
		})`;
	};

	const onChangeColor = ({ detail }: { detail: { value: string } }) => {
		color = detail.value;
		dispatch('change', color);
	};
</script>

<div class="wrapper" use:clickOutside on:clickOutside={() => (isOpen = false)}>
	<button
		class="circle"
		type="button"
		style:background-color={color}
		on:click={() => (isOpen = !isOpen)}
	/>
	{#if isOpen}
		<div class="popup">
			<rgba-string-color-picker color={norimalizeColor(color)} on:color-changed={onChangeColor} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.wrapper {
		position: relative;
	}
	.circle {
		border-radius: 100%;
		height: var(--size, 20px);
		width: var(--size, 20px);
		min-width: var(--size, 20px);
		border: 1px solid var(--color-border);
		box-shadow: 0 0 0 1px var(--color-border);
		cursor: pointer;
	}
	.popup {
		position: absolute;
		top: 100%;
		left: -5px;
		margin-top: 10px;
		z-index: 100;
		box-shadow: var(--base-shadow2);
		overflow: hidden;
		border-radius: var(--border-radius);
	}
</style>
