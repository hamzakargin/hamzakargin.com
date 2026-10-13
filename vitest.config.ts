import { getViteConfig } from "astro/config";
import type { ViteUserConfig } from "vitest/config";

const config: ViteUserConfig = {
  test: {
    include: ["tests/unit/**/*.test.ts"],
  },
};

export default getViteConfig(config);
