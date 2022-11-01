<script lang="ts">
	import { widgets$ } from '../../store/widgets';
	import { Button, ColorPicker, Icon, Input } from '.././../shared';
</script>

<div class="wrapper">
	<div class="input-field">
		<Input
			label="Заголовок"
			type="text"
			value={$widgets$.title}
			on:change={({ detail }) => widgets$.setTitle(detail)}
		/>
	</div>
	<div class="input-field">
		<Input
			label="Фоновое изображение"
			type="text"
			value={$widgets$.backgroundImage}
			on:change={({ detail }) => widgets$.setBackgroundImage(detail)}
		/>
		<ColorPicker
			color={$widgets$.backgroundTone}
			on:change={({ detail }) => widgets$.setBackgroundTone(detail)}
		/>
	</div>

	<div class="footer">
		<Button on:click={widgets$.importSettings}>
			<Icon name="file-import" />
			Импорт
		</Button>
		<Button on:click={widgets$.exportSettings}>
			<Icon name="file-export" />
			Экспорт
		</Button>
	</div>
</div>

<style lang="postcss">
	.wrapper {
		padding: 8px;
		width: 100%;
	}

	.input-field {
		display: flex;
		gap: 10px;
		margin-top: 10px;
		width: 100%;
		align-items: flex-end;
		--size: 30px;
	}

	.footer {
		display: flex;
		margin-top: 24px;
		gap: 10px;

		& :global(button) {
			gap: 6px;
		}
	}
</style>
