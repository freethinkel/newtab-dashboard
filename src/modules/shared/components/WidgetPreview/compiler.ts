import * as svelteCompiler from "svelte/compiler";
import * as svelte from "svelte";
import * as svelteInternal from "svelte/internal";
import * as svelteStore from "svelte/store";

export const compile = async (code: string) => {
  const { js } = svelteCompiler.compile(code, { format: "cjs" });

  const normalized = "const exports = {};" + js.code + "return exports;";

  const require = (module) => {
    switch (module) {
      case "svelte":
        return svelte;
      case "svelte/internal":
        return svelteInternal;
      case "svelte/store":
        return svelteStore;
      default:
        return {};
    }
  };
  const module = Function("require", normalized)(require);

  return module.default;
};
