const EMPTY_ELEMENTS: string[] = [
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'menuitem',
	'meta',
	'param',
	'source',
	'track',
	'wbr'
];

export const register = (monaco: typeof import('monaco-editor')) => {
	monaco.languages.register({ id: 'svelte' });
	monaco.languages.setLanguageConfiguration('svelte', {
		indentationRules: {
			increaseIndentPattern:
				// eslint-disable-next-line max-len, no-useless-escape
				/<(?!\?|(?:area|base|br|col|frame|hr|html|img|input|link|meta|param)\b|[^>]*\/>)([-_\.A-Za-z0-9]+)(?=\s|>)\b[^>]*>(?!.*<\/\1>)|<!--(?!.*-->)|\{[^}"']*$/,
			// eslint-disable-next-line no-useless-escape
			decreaseIndentPattern: /^\s*(<\/(?!html)[-_\.A-Za-z0-9]+\b[^>]*>|-->|\})/
		},
		wordPattern:
			// eslint-disable-next-line max-len, no-useless-escape
			/(-?\d*\.\d\w*)|([^\`\~\!\@\$\#\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
		onEnterRules: [
			{
				// eslint-disable-next-line no-useless-escape
				beforeText: new RegExp(
					`<(?!(?:${EMPTY_ELEMENTS.join('|')}))([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$`,
					'i'
				),
				afterText: /^<\/([_:\w][_:\w-.\d]*)\s*>/i,
				action: { indentAction: monaco.languages.IndentAction.IndentOutdent }
			},
			{
				// eslint-disable-next-line no-useless-escape
				beforeText: new RegExp(
					`<(?!(?:${EMPTY_ELEMENTS.join('|')}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
					'i'
				),
				action: { indentAction: monaco.languages.IndentAction.Indent }
			}
		]
	});
};
