export const useTheme = (callback: (theme: 'light' | 'dark') => void) => {
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

	const checkTheme = (e: { matches: boolean }) => {
		const theme = e.matches ? 'dark' : 'light';
		callback(theme);
	};

	mediaQuery.addListener(checkTheme);
	checkTheme(mediaQuery);
};
