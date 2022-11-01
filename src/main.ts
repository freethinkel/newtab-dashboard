import { init } from './modules/app';
import './styles.pcss';

const main = async () => {
	const root = document.querySelector('#root') as HTMLElement;
	init(root);
};

main();
