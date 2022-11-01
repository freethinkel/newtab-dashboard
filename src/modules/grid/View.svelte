<script lang="ts">
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import Widget from './components/Widget.svelte';
	import { widgets$ } from '../store/widgets';
	import { modal$ } from '../shared/services';
	import { WidgetSettings } from '../settings';

	let items = [];

	const updateItems = (_items) => {
		items = _items;
	};

	const onUpdateItems = () => {
		widgets$.syncItems(items);
	};

	$: {
		updateItems(
			$widgets$.items.map((item) => ({
				6: gridHelp.item(item.config),
				id: item.id,
				data: item.data
			}))
		);
	}

	const cols = [[1600, 6]];
</script>

<div class="wrapper">
	<Grid {cols} bind:items let:dataItem rowHeight={150} on:pointerup={onUpdateItems}>
		<Widget
			on:settings={() =>
				modal$.openModal(WidgetSettings, {
					title: 'Редактирование виджета',
					isFullscreen: true,
					props: {
						id: dataItem.id,
						code: dataItem.data.code
					}
				})}
			code={dataItem.data.code}
			on:remove={() => widgets$.removeWidget(dataItem.id)}
		/>
	</Grid>
</div>

<style lang="postcss">
	.wrapper {
		display: flex;
		flex-grow: 1;
	}

	:global(.shadow-active) {
		background: var(--color-panel) !important;
		border-radius: var(--border-radius);
	}
</style>
