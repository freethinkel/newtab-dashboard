<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let mode: 'raised' | 'icon' = 'raised';

	const dispatch = createEventDispatcher();
</script>

<button
	{type}
	on:click={(event) => dispatch('click', event)}
	on:mousedown={(event) => dispatch('mousedown', event)}
	class="btn"
	class:icon={mode === 'icon'}
	class:raised={mode === 'raised'}
>
	<slot />
</button>

<style lang="postcss">
	.btn {
		appearance: none;
		outline: none;
		cursor: pointer;
		border: none;
		background: none;
		padding: 0;
		margin: 0;
		border-radius: var(--border-radius);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
	}

	.raised {
		background-color: var(--color-primary12);
		padding: 0 12px;
		height: 32px;
		color: var(--color-primary);
		transition: 0.2s;
		border: 2px solid transparent;
		&:focus {
			border-color: var(--color-primary24);
		}
		&:hover {
			box-shadow: 0 2px 6px 0 var(--color-primary12), 0 1px 2px 0 var(--color-primary50);
		}
	}

	.icon {
		padding: 2px;
		height: 32px;
		width: 32px;
		background-color: var(--color-panel);
		transition: 0.1s;
		color: inherit;

		&:hover {
			transform: scale(0.98);
		}
		&:focus {
			box-shadow: 0 0 0 2px var(--color-primary50);
		}
		&:active {
			transform: scale(0.94);
		}
	}
</style>
