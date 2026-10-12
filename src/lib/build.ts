import { execSync } from "node:child_process";
import pkg from "../../package.json";

function readCommit() {
  if (process.env.COMMIT_SHA) return process.env.COMMIT_SHA;
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return undefined;
  }
}

const clean = (version: string) => version.replace(/^[^\d]*/, "");
const deps: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };

export const build = {
  commit: readCommit()?.slice(0, 7),
  date: new Date(),
  stack: [
    ["astro", deps.astro],
    ["react", deps.react],
    ["tailwindcss", deps.tailwindcss],
    ["@base-ui/react", deps["@base-ui/react"]],
    ["bun", pkg.packageManager.split("@")[1]],
  ]
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([name, version]) => `${name}@${clean(version)}`),
};
