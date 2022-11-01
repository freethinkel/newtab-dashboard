<script>
	import { fade } from 'svelte/transition';

	import { init as initGrid } from '../grid';
	import { AppSettings } from '../settings';
	import { Icon, Button, Modal } from '../shared';
	import { modal$ } from '../shared/services';
	import { widgets$ } from '../store/widgets';
</script>

<div
	class="wrapper"
	style:--image={`url(${$widgets$.backgroundImage})`}
	style:--tone={$widgets$.backgroundTone || 'transparent'}
>
	<div class="toolbar">
		<h1>{$widgets$.title}</h1>

		<div class="controls">
			<Button mode="icon" on:click={() => widgets$.addNewWidget()}>
				<Icon name="plus" />
			</Button>
			<Button mode="icon" on:click={() => modal$.openModal(AppSettings, { title: 'Настройки' })}>
				<Icon name="settings" />
			</Button>
		</div>
	</div>

	<div class="grid">
		<div use:initGrid />
	</div>

	{#if $modal$.current}
		<div transition:fade={{ duration: 100 }} class="modal">
			<Modal
				title={$modal$.title}
				isFullscreen={$modal$.isFullscreen}
				on:close={() => modal$.closeModal()}
			>
				<svelte:component this={$modal$.current} {...$modal$.props} />
			</Modal>
		</div>
	{/if}
</div>

<style lang="postcss">
	.wrapper {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-size: cover;
		background-position: center;
		position: relative;
		background-image: var(--image);
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: var(--tone);
		}
	}

	.toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 10px;
		z-index: 100;
	}

	.controls {
		display: flex;
		gap: 12px;
	}

	.grid {
		padding-top: 16px;
		flex-grow: 1;
		min-height: 0;
		overflow: auto;
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000000;
	}
</style>
