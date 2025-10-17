const config = {
  "**/*.{ts?(x),mts}": () => "pnpm validate-typescript",
  "*.{js,jsx,mjs,cjs,ts,tsx,mts}": [
    "pnpm lint:file",
    "pnpm exec vitest related --run",
  ],
  "*.{md,json}": "pnpm exec prettier --write",
  // Disabled for Windows compatibility - run manually if needed
  // "*": "pnpm typos",
  // "*.{yml,yaml}": "pnpm lint:yaml",
};

export default config;
