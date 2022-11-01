import * as monaco from 'monaco-editor';
import { useTheme } from '../shared';
import githubDarkTheme from './themes/github-dark.json';
import githubLightTheme from './themes/github-light.json';

self.MonacoEnvironment = {
  getWorker: function(_workerId: string, label: string) {
    const getWorkerModule = (moduleUrl: string, label: string) => {
      return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl, label), {
        name: label,
        type: 'module'
      });
    };

    switch (label) {
      case 'json':
        return getWorkerModule('monaco-editor/esm/vs/language/json/json.worker?worker', label);
      case 'css':
      case 'scss':
      case 'less':
        return getWorkerModule('monaco-editor/esm/vs/language/css/css.worker?worker', label);
      case 'html':
      case 'handlebars':
      case 'razor':
        return getWorkerModule('monaco-editor/esm/vs/language/html/html.worker?worker', label);
      case 'typescript':
      case 'javascript':
        return getWorkerModule('monaco-editor/esm/vs/language/typescript/ts.worker?worker', label);
      default:
        return getWorkerModule('monaco-editor/esm/vs/editor/editor.worker?worker', label);
    }
  }
};

type EditorProps = {
  onUpdate?: (content: string) => void;
  content?: string;
};

export const init = (el: HTMLElement, props: EditorProps) => {
  const editor = monaco.editor.create(el, {
    value: props.content,
    language: 'html',
    minimap: {
      enabled: false
    }
  });

  monaco.editor.defineTheme('github-dark', githubDarkTheme as any);
  monaco.editor.defineTheme('github-light', githubLightTheme as any);
  monaco.editor.setTheme('vs-light');

  editor.addAction({
    id: 'on-save-action',
    label: 'on save action',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    run: () => {
      props.onUpdate?.(editor.getValue());
    }
  });

  useTheme((theme) => {
    console.log(theme)
    if (theme === 'dark') {
      monaco.editor.setTheme('vs-dark');
    } else {
      monaco.editor.setTheme('vs-light');
    }
  });

  window.addEventListener('resize', () => {
    editor.layout();
  });
};
