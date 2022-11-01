<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type = '';
	export let value = '';
	export let label = '';

	const dispatch = createEventDispatcher();

	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		dispatch('change', target.value);
	};
</script>

<label>
	{#if label}
		<div class="label">{label}</div>
	{/if}
	<input {type} {value} on:input={onInput} />
</label>

<style lang="postcss">
	label {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.label {
		font-size: 0.8rem;
		font-weight: bold;
	}
	input {
		border: 1px solid var(--color-border);
		background-color: var(--color-panel);
		appearance: none;
		outline: none;
		border-radius: var(--border-radius);
		padding: 6px 4px;
		font-size: 1rem;
		color: var(--color-title);

		&:focus {
			border-color: var(--color-primary);
		}
	}
</style>
