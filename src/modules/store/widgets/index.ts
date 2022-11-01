import { get, writable } from 'svelte/store';
import type { WidgetItem } from './types';
import { addNewItem, downloadFile, importFile, Storage } from './helpers';
import { GRID_COLS } from './constants';

const DEFAULT = {
	items: [] as WidgetItem[],
	title: 'Мои виджеты',
	backgroundImage: '',
	backgroundTone: ''
};

const store = writable({ ...DEFAULT });

let initialized = false;
store.subscribe((state) => {
	if (initialized) {
		Storage.instance.setItem('widgets', state);
	}
	initialized = true;
});

export const widgets$ = {
	subscribe: store.subscribe,
	async importSettings() {
		try {
			const result = await importFile('json');
			console.log(result);
			const settings = JSON.parse(result);
			store.update((state) => {
				return {
					...state,
					...{ items: settings.items, title: settings.title }
				};
			});
		} catch (err) {
			console.error(err);
		}
	},
	exportSettings() {
		const state = get(store);
		const fileContent = JSON.stringify(state);

		downloadFile('widget-settings.json', fileContent);
	},
	setBackgroundTone(color: string) {
		store.update((state) => {
			state.backgroundTone = color;
			return state;
		});
	},
	setBackgroundImage(image: string) {
		store.update((state) => {
			state.backgroundImage = image;
			return state;
		});
	},
	setTitle(title: string) {
		store.update((state) => {
			state.title = title;
			return state;
		});
	},
	async init() {
		const cached = await Storage.instance.getItem('widgets');

		store.update((state) => {
			return cached || state;
		});
	},
	syncItems(items: Record<string, unknown>[]) {
		store.update((state) => {
			state.items = items.map(
				(item) =>
					({
						config: item[GRID_COLS],
						data: item.data,
						id: item.id
					} as WidgetItem)
			);

			return state;
		});
	},
	updateWidgetContent(id: string, newContent: string) {
		store.update((state) => {
			state.items = state.items.map((item) => {
				if (item.id !== id) {
					return item;
				}

				return {
					...item,
					data: {
						code: newContent
					}
				};
			});
			return state;
		});
	},
	addNewWidget() {
		store.update((state) => {
			state.items.push(addNewItem(get(store).items));
			return state;
		});
	},
	removeWidget(id: string) {
		store.update((state) => {
			state.items = state.items.filter((item) => item.id !== id);
			return state;
		});
	}
};
